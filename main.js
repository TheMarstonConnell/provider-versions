
window.addEventListener("load", main)


function main () {

    const provNode = document.getElementById("providers")


    fetch("https://api.jackalprotocol.com/jackal-dao/canine-chain/storage/active_providers").then(r => r.json()).then(res => {
        const providers = res["providers"]
        console.log(providers)


        for (const provider of providers) {
            const adr = provider.address
            fetch("https://api.jackalprotocol.com/jackal-dao/canine-chain/storage/providers/" + provider.address).then(r => r.json()).then(res => {
                const ip = res.providers.ip

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

                    li.appendChild(address)
                    li.appendChild(pip)
                    li.appendChild(version)

                    provNode.appendChild(li)
                })
            })


        }
    })


}
