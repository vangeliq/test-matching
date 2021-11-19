# sample from: https://github.com/torch-js/torch-js
import torch
import torch.nn as nn

class TestModule(torch.nn.Module):
    def __init__(self):
        super(TestModule, self).__init__()

    def forward(self, input1, input2):
        return input1 + input2
