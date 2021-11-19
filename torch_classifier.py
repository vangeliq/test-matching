import torch
import torch.nn as nn
import transformers
from torch.utils.data import Dataset, DataLoader


pretrained_weights='bert-base-uncased'

class BertNN(nn.Module):
    def __init__(self, hidden_size):
        super(BertNN, self).__init__()
        self.bert_model = transformers.BertModel.from_pretrained(
            pretrained_weights, output_attentions = True)
        self.dropout = nn.Dropout(0.1)
        self.fc = nn.Linear(hidden_size, 1)

    def forward(self, ex):
        _, pooled_output, attentions = self.bert_model(ex)
        pooled_output = self.dropout(pooled_output)
        fc_out = self.fc(pooled_output)
        return fc_out, attentions


FILE = "model_state_dict.pth"

loaded_model = BertNN(hidden_size=768)
loaded_model.load_state_dict(torch.load(FILE,map_location=torch.device('cpu')))
loaded_model.eval()

print("HELLO THERE")
print(loaded_model)

INPUT = "im feeling really sad and depressed right now"
# loaded_model(INPUT)

# data = Dataset([["im feeling really sad and depressed right now", 1]],96)
inputText = "I can't sleep... heart rate is banging from shock and anxiety, having a night tea and waiting to sleep.. "
data = torch.utils.data.Dataset([[inputText, 1]],96)

train_dataloader = DataLoader(data)
feats, _ = next(iter(train_dataloader))
scores, _ = loaded_model(feats)
print(torch.sigmoid(scores))