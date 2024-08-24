
window.addEventListener("load", main)


function main () {

    const provNode = document.getElementById("providers")


    fetch("https://api.jackalprotocol.com/jackal/canine-chain/storage/active_providers").then(r => r.json()).then(res => {
        const providers = res["providers"]
        console.log(providers)


        for (const provider of providers) {
            const adr = provider.address
            fetch("https://api.jackalprotocol.com/jackal/canine-chain/storage/providers/" + provider.address).then(r => r.json()).then(res => {
                const ip = res.provider.ip

                fetch(ip + "/recycle/salvage").then(r => r.json()).then(res => {
                    console.log(res)

                    const li = document.createElement("tr")
                    li.classList.add("provider")

                    const v = document.createTextNode(res.is_salvage_finished)
                    const progress = document.createTextNode(res.total_jackal_provider_files)
                    const currentFiles = document.createTextNode(res.salvaged_files_count)

                    const migration = document.createElement("td")
                    migration.classList.add("migration")
                    migration.appendChild(v)

                    const prog = document.createElement("td")
                    prog.classList.add("progress")
                    prog.appendChild(progress)

                    const current = document.createElement("td")
                    current.classList.add("current")
                    current.appendChild(currentFiles)

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
                    li.appendChild(current)
                    li.appendChild(prog)
                    li.appendChild(migration)

                    provNode.appendChild(li)
                }).catch(e => {
                    console.error(e)
                })
            })


        }
    })


}
