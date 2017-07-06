const IRC = require("irc-framework");
const vm = require("vm");
 
let client = new IRC.Client();
let data = {};
 
client.on("message", event => {
    if(event.message.match(/^>> /)) {
        try {
            event.reply(new String(vm.runInNewContext(
                event.message.substr(3), data,
                {timeout: 5000}
            )));
        } catch(e) {
            event.reply("\x034!! " + new String(e));
        }
    }
});
 
client.on("registered", () => {
    client.join("#thevoid", "EnterTheVoid");
    client.join("#nodebot");
});
 
client.connect({
    nick: "NodeBot",
    username: "NodeBot",
    gecos: "Not Anna",
    auto_reconnect: true,
    host: "voidnet.max-p.me",
    port: 6697,
    tls: true
});
