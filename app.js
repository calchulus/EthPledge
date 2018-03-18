// Import the page's CSS. Webpack will know what to do with it.
import '../stylesheets/app.css'

// Import libraries we need.
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'

import EthPledge_artifacts from '../../build/contracts/EthPledge.json'

var EthPledge = contract(EthPledge_artifacts)

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts
var account

var i, j, p

var totalCampaigns

var iD

var benefactor = []
var charity = []
var amountPledged = []
var amountRaised = []
var donationsReceived = []
var multiplier = []
var active = []
var successful = []
var timeStarted = []
var description = []

    window.buyRock = function () {

    },

    window.buyMainRock = function () {

    },

    window.App = {

      start: function () {
        var self = this

          EthPledge.setProvider(web3.currentProvider)
      }

    }

function openNav () {
  document.getElementById('myNav').style.width = '100%'
}

window.openNav = function () {
  document.getElementById('myNav').style.width = '100%'
}

window.closeNav = function () {
  document.getElementById('myNav').style.width = '0%'
}

window.sell = function () {

}

window.contribute = function () {

    $('number').click(function() {
        iD = this.id

        console.log(iD)

        divContent.innerHTML = '<div id="userInfo"></div><div id="infoBox"></div><div id="statusLeft"></div>'

        document.getElementById('myNav').style.width = '100%'

        userInfo.innerHTML = '<h4>Contribute to Pledge ID ' + iD + '</h4><br>'

        p = document.createElement('p')
        p.className = 'campaignTables'
        if (multiplier[iD] == 1) {
            p.innerHTML = '<b>Pledge ID ' + iD + '</b>: <i>' + description[iD] + '</i> <br> Begun by address ' + benefactor[iD] + ', who has <b>pledged to donate ' + amountPledged[iD] + ' Ether</b> to address ' + charity[iD] + '. <u>So far ' + amountRaised[iD] + ' Ether has been contributed</u> to this pledge over ' + donationsReceived[iD] + ' donations. For this pledge to be successful, ' + amountPledged[iD] + ' Ether would need to be contributed by others. This pledge has an <u>active status of ' + active[iD] + '</u> and a <u>successful status of ' + successful[iD] + '</u>. It was started at ' + timeStarted[iD] + '.'
        } else {
            p.innerHTML = '<b>Pledge ID ' + iD + '</b>: <i>' + description[iD] + '</i> <br> Begun by address ' + benefactor[iD] + ', who has pledged to donate <b>' + amountPledged[iD] + ' Ether</b> to address ' + charity[iD] + '. So far ' + amountRaised[iD] + ' Ether has been contributed to this pledge over ' + donationsReceived[iD] + ' donations. This pledge has been setup with a multiplier of ' + multiplier[iD] + ', so others would need to contribute an extra 1/' + multiplier[iD] + ' of the amount pledged of ' + amountPledged[iD] + ' for it to be marked as successful. This pledge has an active status of ' + active[iD] + ' and a successful status of ' + successful[iD] + '. It was started at ' + timeStarted[iD] + '.'
        }
        infoBox.appendChild(p)

        if (active[iD].toString() != 'true') {
            statusLeft.innerHTML = '<hr>This pledge is no longer active.'
        } else {
            EthPledge.deployed().then(function (contractInstance) {
                contractInstance.returnHowMuchMoreETHNeeded(iD).then(function (result) {
                    console.log(result + ' is how much more eth needed')

                    if (+result > 0) {
                        statusLeft.innerHTML = '<hr><b>This pledge requires ' + result/1000000000000000000 + ' more Ether to be contributed before it becomes successful.</b><hr><div class="form-group">\n' +
                            '            <textarea class="form-control" rows="1" id="amountToContribute" placeholder="Amount of Ether to contribute - can enter decimals (eg. 0.0123)" style="overflow:auto"></textarea>\n' +
                            '        </div>\n' +
                            '\n' +
                            '        <a href="#!" onclick="submitContribution()" button id="submitContributionButton" class="btn btn-primary btn-block">Contribute!</a>'
                    }

                })
            })
        }



    });

}

window.remove = function () {

}

window.addEventListener('load', function () {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
        // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider)

    let main = document.getElementById('maintable')

    let campaignsTables = document.getElementById('campaignTables')

    let infoBox = document.getElementById('infoBox')

    let divContent = document.getElementById('divContent')

    let statusLeft = document.getElementById('statusLeft')

    web3.version.getNetwork((err, netId) => {
      switch (netId) {
        case '1':
                    // main

            break
        case '2':
                    // dunno

          break
        case '3':
                    // ropsten?

          break
        case '4':
                    // rinkeby

/*
          EthPledge.deployed().then(function (contractInstance) {
              contractInstance.createCampaign("0xF66b365bEeDF4a96A011Bd47205091e783437565", "1", "0x657468657265756d000000000000000000000000000000000000000000000000", { from: web3.eth.accounts[0], value: 30000000000000000}).then(function (result) {

              })
          })
*/

          // campaignTables.innerHTML = '<img src="https://www.cryptosprites.com/sprites/' + 'spinner' + '.gif" width="200px" height="200px" align="middle" style="vertical-align:bottom" class="center">'

          campaignTables.innerHTML = '<img src="https://www.cryptosprites.com/sprites/' + 'spinner' + '.gif" align="middle" style="vertical-align:bottom" class="center">'

          EthPledge.deployed().then(function (contractInstance) {
            contractInstance.generalInfo.call().then(function (result) {
              // console.log(result[0].c[0])
              totalCampaigns = result[0].c[0]
              console.log(totalCampaigns)

                EthPledge.deployed().then(function (contractInstance) {

                    const displayCampaigns = async function () {
                        for (i = totalCampaigns - 1; i >= 0; i--) {
                            console.log('i of value ' + i + ' starting')

                            const data = await contractInstance.lookupCampaignPart1.call(i).then(function (results) {

                                // console.log(results)

                                benefactor[i] = results[0]
                                charity[i] = results[1]
                                amountPledged[i] = results[2]/1000000000000000000
                                amountRaised[i] = results[3]/1000000000000000000
                                donationsReceived[i] = results[4]

                                console.log('benefactor: ' + benefactor[i])
                                console.log('charity: ' + charity[i])
                                console.log('amountPledged: ' + amountPledged[i])
                                console.log('amountRaised: ' + amountRaised[i])
                                console.log('donationsReceived: ' + donationsReceived[i])

                            })
                        }
                    }

                    displayCampaigns().then(() => {
                        console.log('done')

                    campaignTables.innerHTML = ''

                    const displayCampaigns2 = async function () {
                        for (j = totalCampaigns - 1; j >= 0; j--) {
                            console.log('j is ' + j)


                            const data2 = await
                            contractInstance.lookupCampaignPart2.call(j).then(function (results) {

                              console.log('printing for j of ' + j)

                                console.log(results)

                                var date = new Date(+results[3] * 1000)

                                multiplier[j] = results[0]
                                active[j] = results[1]
                                successful[j] = results[2]
                                timeStarted[j] = date.toLocaleString()
                                description[j] = web3.toAscii(results[4])

                                console.log('multiplier: ' + multiplier[j])
                                console.log('active: ' + active[j])
                                console.log('successful: ' + successful[j])
                                console.log('timeStarted: ' + timeStarted[j])
                                console.log('description: ' + description[j])



                                p = document.createElement('p')
                                p.className = 'campaignTables'
                                if (multiplier[j] == 1) {
                                    p.innerHTML = '<b>Pledge ID ' + j + '</b>: <i>' + description[j] + '</i> <br> Begun by address ' + benefactor[j] + ', who has <b>pledged to donate ' + amountPledged[j] + ' Ether</b> to address ' + charity[j] + '. <u>So far ' + amountRaised[j] + ' Ether has been contributed</u> to this pledge over ' + donationsReceived[j] + ' donations. For this pledge to be successful, ' + amountPledged[j] + ' Ether would need to be contributed by others. This pledge has an <u>active status of ' + active[j] + '</u> and a <u>successful status of ' + successful[j] + '</u>. It was started at ' + timeStarted[j] + '. <br><hr><number id="' + j + '"><a href="#!" onclick="contribute()">Contribute to this pledge</a></number> | <a href="http://www.ethpledge.com/id/' + j + '">Permalink</a>'
                                } else {
                                    p.innerHTML = '<b>Pledge ID ' + j + '</b>: <i>' + description[j] + '</i> <br> Begun by address ' + benefactor[j] + ', who has pledged to donate <b>' + amountPledged[j] + ' Ether</b> to address ' + charity[j] + '. So far ' + amountRaised[j] + ' Ether has been contributed to this pledge over ' + donationsReceived[j] + ' donations. This pledge has been setup with a multiplier of ' + multiplier[j] + ', so others would need to contribute an extra 1/' + multiplier[j] + ' of the amount pledged of ' + amountPledged[j] + ' for it to be marked as successful. This pledge has an active status of ' + active[j] + ' and a successful status of ' + successful[j] + '. It was started at ' + timeStarted[j] + '.'
                                }
                                campaignsTables.appendChild(p)

                            })

                        }
                    }

                    displayCampaigns2().then(() => {
                        console.log('all done')
                }).catch((e) => {
                        console.error(e)
                })


                }).catch((e) => {
                        console.error(e)
                })
                })


            })
          })


            break
        default:
                // nothing

      }
    })
  } else {
        // nothing
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask")

  }

  App.start()

    // openNav()
})
