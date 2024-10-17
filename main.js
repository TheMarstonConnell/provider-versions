
window.addEventListener("load", main)


function main () {

    const provNode = document.getElementById("providers")


    fetch("https://api.jackalprotocol.com/jackal/canine-chain/storage/active_providers").then(r => r.json()).then(res => {
        const providers = res["providers"]
        console.log(providers)


        for (const provider of providers) {
            const adr = provider.address
            fetch("https://api.jackalprotocol.com/jackal/canine-chain/storage/providers/" + adr).then(r => r.json()).then(res => {
                const ip = res.provider.ip

                fetch(ip + "/version").then(r => r.json()).then(res => {
                    console.log(res)

                    const li = document.createElement("tr")
                    li.classList.add("provider")

                    const v = document.createTextNode(res.version)

                    const version = document.createElement("td")
                    version.classList.add("version")
                    version.appendChild(v)

                    const n = document.createTextNode(adr)
                    const address = document.createElement("td")
                    address.classList.add("address")
                    address.appendChild(n)


                    const ipN = document.createTextNode(ip)
                    const pip = document.createElement("td")
                    pip.classList.add("ip")
                    pip.appendChild(ipN)

                    fetch("https://api.jackalprotocol.com/cosmos/bank/v1beta1/balances/" + adr).then(r => r.json()).then(res => {
                        console.log(res)

                        const r = res.balances[0]
                        console.log(r)
                        const v = document.createTextNode(r.amount ? r.amount / 1000000 : "n/a")
                        const bal = document.createElement("td")
                        bal.classList.add("bank")
                        bal.appendChild(v)

                        li.appendChild(address)
                        li.appendChild(pip)
                        li.appendChild(version)
                        li.appendChild(bal)

                        provNode.appendChild(li)
                    })
                })
            })


        }
    })


}
