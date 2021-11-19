const torch = require("torch-js");

var test_model_path = "./test_model.pt";

var script_module = new torch.ScriptModule(test_model_path);
console.log(script_module.toString());

var a = torch.rand(1, 5);
console.log(a.toObject());
var b = torch.rand([1, 5]);
console.log(b.toObject());

var c = script_module.forward(a, b);
console.log(c.toObject());

var d = torch.tensor([[0.1, 0.2, 0.3, 0.4, 0.5]]);
console.log(d.toObject());

var e = script_module.forward(c, d);
console.log(e.toObject());
