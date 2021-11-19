# saveload is a tutorial from youtue:
# link is : TODO
# the saved model is model.pth

import torch
import torch.nn as nn

class Model(nn.Module):
        def __init__(self, n_input_features):
            super(Model, self).__init__()
            self.linear = nn.Linear(n_input_features, 1)

        def forward(self,x):
            y_pred = torch.sigmoid(self.linear(x))
            return y_pred

# model = Model(n_input_features=6)
# #train model

# for param in model.parameters():
#     print(param)
TENSOR  = torch.tensor([1])
STRING = "I am really really really depressed and not happy at all"
FILE = "/Users/Angel/Documents/final-matching/python_trials/youtubee/model.pth"

# torch.save(model.state_dict(),FILE)


loaded_model = Model(n_input_features=6)
loaded_model.load_state_dict(torch.load(FILE))
loaded_model.eval()

for param in loaded_model.parameters():
    print(param)
print("HELLO THERE")
print(loaded_model)
# loaded_model(TENSOR)

