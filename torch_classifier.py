import torch
import torch.nn as nn
import transformers
from torch.utils.data import Dataset, DataLoader



pretrained_weights='bert-base-uncased'
tokenizer_class = transformers.BertTokenizer
tokenizer = tokenizer_class.from_pretrained(pretrained_weights)

class Dataset(Dataset):
    def __init__(self, dataframe, max_len):
        self.dataframe = dataframe
        self.max_len = max_len
        self.sep_id = tokenizer.encode(['[SEP]'], add_special_tokens=False)
        self.pad_id = tokenizer.encode(['[PAD]'], add_special_tokens=False)

    def __len__(self):
        return len(self.dataframe)

    def __getitem__(self, idx):
        row = self.dataframe[idx]
        text = row[0]
        targets = torch.tensor(list(row[1:]))
        encoded = tokenizer.encode(text, add_special_tokens=True)[:self.max_len-1]
        if encoded[-1] != self.sep_id[0]:
            encoded = encoded + self.sep_id
        padded = encoded + self.pad_id * (self.max_len - len(encoded))
        padded = torch.tensor(padded)
        labels = torch.Tensor(list(row[1:]))
        return padded, labels

class BertNN(nn.Module):
    def __init__(self, hidden_size):
        super(BertNN, self).__init__()
        self.bert_model = transformers.BertModel.from_pretrained(
            pretrained_weights, output_attentions = True)
        self.dropout = nn.Dropout(0.1)
        self.fc = nn.Linear(hidden_size, 1)

    def forward(self, ex):
        _, pooled_output, attentions = self.bert_model(ex, return_dict=False)
        pooled_output = self.dropout(pooled_output)
        fc_out = self.fc(pooled_output)
        return fc_out, attentions


FILE = "model_state_dict.pth"

loaded_model = BertNN(hidden_size=768)
loaded_model.load_state_dict(torch.load(FILE,map_location=torch.device('cpu')),strict=False )
loaded_model.eval()

#print(loaded_model)

INPUT = "im feeling really sad and depressed right now"
# loaded_model(INPUT)

# data = Dataset([["im feeling really sad and depressed right now", 1]],96)
inputText = "I can't sleep... heart rate is banging from shock and anxiety, having a night tea and waiting to sleep.. "
data = Dataset([[inputText, 1]],96)

train_dataloader = DataLoader(data)
feats, _ = next(iter(train_dataloader))
scores, _ = loaded_model(feats)
print(torch.sigmoid(scores).item())
