let lobbies = [];

function run_Auction() {
    getTodayLobby();
    getPastLobbies()
}

setInterval(() => {
    getTodayLobby()
}, 1000 * 20);

function getTodayLobby() {
    myObj = { "day":"", "amount":"", "ratio":"", "state":"open", "received":"", "entryAmount":""}

    //col 1 Current Day
    $('.fi-1')[0]['innerHTML'] = '#' + currentDay;
    myObj.day = currentDay
    //col 2 Amount of D2X in Pool
    $('.fi-2')[0]['innerHTML'] = abbreviate_number(calcDaysLobbyPayout(currentDay) / DESI, 2);
    myObj.amount = abbreviate_number(calcDaysLobbyPayout(currentDay) / DESI, 2);


    //col 3 Ratio of T2X to Tron
    let parsedDayEntryValue = 0;
    mainContract.xfLobby(currentDay).call({
        shouldPollResponse: true
    })['then']((dayEntryValue) => {
        parsedDayEntryValue = parseFloat(tronWeb['fromSun'](dayEntryValue));
        myObj.ratio = ((calcDaysLobbyPayout(currentDay) / DESI) / parsedDayEntryValue)['toFixed'](2)
        $('.fi-4')[0]['innerHTML'] = ((calcDaysLobbyPayout(currentDay) / DESI) / parsedDayEntryValue)['toFixed'](2)
    });




    let dayEntry = 0;
    mainContract['xfLobbyMembers'](currentDay, user['address'])['call']({
        shouldPollResponse: true
    })['then']((dayEntryValue) => {
        for (var numDay = 0; numDay < dayEntryValue['tailIndex']; numDay++) {
            
            mainContract.xfLobbyEntry(user.address, currentDay, numDay).call({
                shouldPollResponse: true
            })['then']((dayEntryValue) => {
                dayEntry += parseFloat(tronWeb['fromSun'](dayEntryValue['rawAmount']._hex));
                 
                myObj.received =
                 $('.fi-6')[0]['innerHTML'] = abbreviate_number(((calcDaysLobbyPayout(currentDay) / DESI) * dayEntry / parsedDayEntryValue), 2)
                 $('.fi-8')[0]['innerHTML'] = abbreviate_number(dayEntry, 2);
            })
        }
    });



    // // Col 7 Day Entry
    // mainContract['xfLobby'](currentDay)['call']({
    //     shouldPollResponse: true
    // })['then']((dayEntryValue) => {
    //     parsedDayEntryValue = parseFloat(tronWeb['fromSun'](dayEntryValue));
        
    //     $(`${'.fi-10'}`)[0]['innerHTML'] = abbreviate_number(parsedDayEntryValue, 2)
    // })

    console.log('Data', myObj);
}









function calcDaysLobbyPayout(currentDay) {
    if (currentDay <= 365) {
        return 5000000 * (100000000) - ((currentDay - 1) * 1095890410958)
    } else {
        return 1000000 * (100000000)
    }
}
let clcD1 = true;

function getPastLobbies() {
    $('.holder-list')[0]['innerHTML'] = '';
    for (var numDay = currentDay; numDay > 1; numDay--) {
        let endButton = `${'\x0D\x0A        <div style="">\x0D\x0A            <button class="button w-24 shadow-md mr-1 mb-2 bg-gray-200 text-gray-600"\x0D\x0A                style="margin: 0;padding: 5px 10px;width: 85%; cursor: auto; float: right;">ENDED</button>\x0D\x0A        </div>\x0D\x0A        '}`;
        let row = '';
        if (!clcD1) {
            row = 'tb-active-row-2'
        };
        $('.holder-list')[0]['innerHTML'] += `${'\x0D\x0A        <div class="box px-4 py-4 mb-3 flex items-center zoom-in '}${row}${'"\x0D\x0A            style="padding: 8px 0px; cursor: auto; margin-bottom: 7px; color: #b4c5e1a3; background: #3b3b59;">\x0D\x0A\x0D\x0A            <div class="w-64 sm:w-auto truncate"\x0D\x0A                style="display:inline-block;width: 5%;text-align:center;font-weight: 900;">\x0D\x0A                <span class="fi-1-day-'}${numDay- 1}${' inbox__item--highlight">#'}${numDay- 1}${'</span>\x0D\x0A            </div>\x0D\x0A\x0D\x0A            <div class="w-64 sm:w-auto truncate"\x0D\x0A                style="display:inline-block; width: 14%; text-align:center; font-weight: 900">\x0D\x0A                <span class=fi-2-day-'}${numDay- 1}${' inbox__item--highlight" style="padding-left: 7%;">'}${abbreviate_number(calcDaysLobbyPayout(numDay- 1)/ DESI,2)}${'</span>\x0D\x0A            </div>\x0D\x0A\x0D\x0A            <div class="w-64 sm:w-auto truncate"\x0D\x0A                style="display:inline-block;width: 15.0%;text-align:center;font-weight: 900;">\x0D\x0A                <span class="fi-4-day-'}${numDay- 1}${' inbox__item--highlight" style="padding-left: 7%;">..</span>\x0D\x0A            </div>\x0D\x0A\x0D\x0A            <div class="w-64 sm:w-auto truncate"\x0D\x0A                style="display:inline-block;width: 16.0%;text-align:center;font-weight: 900;">\x0D\x0A                <span class=fi-5-day-'}${numDay- 1}${' inbox__item--highlight" style="padding-right: 7%;">..</span>\x0D\x0A            </div>\x0D\x0A\x0D\x0A            <div class="w-64 sm:w-auto truncate"\x0D\x0A                style="display:inline-block;width: 15.5%;text-align:center;font-weight: 900;">\x0D\x0A                <span class="fi-6-day-'}${numDay- 1}${' inbox__item--highlight" style="padding-right: 0%;">..</span>\x0D\x0A            </div>\x0D\x0A\x0D\x0A            <div class="w-64 sm:w-auto truncate"\x0D\x0A                style="display:inline-block;width: 15.5%;text-align:center;font-weight: 900;">\x0D\x0A                <span class=fi-8-day-'}${numDay- 1}${' inbox__item--highlight" style="padding-left: 20%;">..</span>\x0D\x0A            </div>\x0D\x0A\x0D\x0A            <div class="w-64 sm:w-auto truncate"\x0D\x0A                style="display:inline-block;width: 15.5%;text-align:center;font-weight: 900;">\x0D\x0A                <span class=fi-10-day-'}${numDay- 1}${' inbox__item--highlight" style="padding-left: 20%;">..</span>\x0D\x0A            </div>\x0D\x0A\x0D\x0A            <div class="fi-9-day-'}${numDay- 1}${'" style="display:inline-block;width: 15.5%; padding-right: 1%;">'}${endButton}${'</div>\x0D\x0A        </div>\x0D\x0A        '}`;
        midlleCaller(numDay - 1);
        clcD1 = !clcD1
    }

    console.log
}

function midlleCaller(numDay) {
    setTimeout(() => {
        getLobbyData(numDay)
    }, 250 * numDay)
}

function getLobbyData(currentDay) {
    let parsedDayEntryValue = 0;
    mainContract['xfLobby'](currentDay)['call']({
        shouldPollResponse: true
    })['then']((dayEntryValue) => {
        parsedDayEntryValue += parseFloat(tronWeb['fromSun'](dayEntryValue));
        console.log('Sun data', parsedDayEntryValue );
        $(`${'.fi-4-day-'}${currentDay}${''}`)[0]['innerHTML'] = ((calcDaysLobbyPayout(currentDay) / DESI) / parsedDayEntryValue)['toFixed'](2);
        $(`${'.fi-5-day-'}${currentDay}${''}`)[0]['innerHTML'] = 'closed';
        $(`${'.fi-10-day-'}${currentDay}${''}`)[0]['innerHTML'] = abbreviate_number(parsedDayEntryValue, 2)
    });
    let dayEntry = 0;
    mainContract['xfLobbyMembers'](currentDay, user['address'])['call']({
        shouldPollResponse: true
    })['then']((dayEntryValue) => {
        for (var numDay = 0; numDay < dayEntryValue['tailIndex']; numDay++) {
            mainContract['xfLobbyEntry'](user['address'], currentDay, numDay)['call']({
                shouldPollResponse: true
            })['then']((dayEntryValue) => {
                dayEntry += parseFloat(tronWeb['fromSun'](dayEntryValue['rawAmount']._hex));
                $(`${'.fi-8-day-'}${currentDay}${''}`)[0]['innerHTML'] = abbreviate_number(dayEntry, 2);
                $(`${'.fi-6-day-'}${currentDay}${''}`)[0]['innerHTML'] = abbreviate_number(((calcDaysLobbyPayout(currentDay) / DESI) * dayEntry / parsedDayEntryValue), 2);
                let _0xa50fx10 = 0;
                mainContract['xfLobby'](currentDay)['call']({
                    shouldPollResponse: true
                })['then']((dayEntryValue) => {
                    _0xa50fx10 += parseFloat(tronWeb['fromSun'](dayEntryValue))
                });
                $(`${'.fi-9-day-'}${currentDay}${''}`)[0]['innerHTML'] = `${'\x0D\x0A                <div style="">\x0D\x0A                    <button class="button w-24 shadow-md mr-1 mb-2 bg-theme-9 text-white"\x0D\x0A                        style="margin: 0;padding: 5px 10px;float: right;width: 85%; float: right;" onClick="collectLobby('}${currentDay}${')">COLLECT</button>\x0D\x0A                </div>\x0D\x0A                '}`
            })
        }
    })
}

function collectLobby(currentDay) {
    mainContract['xfLobbyExit'](currentDay, 0)['send']({
        shouldPollResponse: true
    })['then']((dayEntryValue) => {})['catch']((_0xa50fx12) => {
        console['error'](_0xa50fx12, 'er')
    })['finally']((dayEntryValue) => {
        getPastLobbies()
    })
}

function enterLobby() {
    $('.btn-auction-enter-load')[0]['style']['display'] = 'block';
    $('.btn-auction-enter-txt')[0]['innerHTML'] = '';
    let _0xa50fx14 = setInterval(() => {
        if (!$('.modal.show')[0]) {
            clearInterval(_0xa50fx14);
            $('.btn-auction-enter-load')[0]['style']['display'] = 'none';
            $('.btn-auction-enter-txt')[0]['innerHTML'] = 'ENTER'
        }
    }, 300)
}

function enterLobbyFinal() {
    //assign address in user['referrer'] to the variable referrer
    let referrer = user['referrer'];

    if (referrer === zeroAddress 
    || referrer === 'TSRDnYXAYecRdmG4a5jfUrenoeqH5b7xxs' 
    || referrer === 'TNAVgrYyxfNwMWRYGQRZ6Uwwq4pGQ4ZbaS' 
    || referrer === 'TVNwEqDiwBfyGaJU1FEcjCZCCzDoezsUif' 
    || referrer === 'TCp2HawNn7hsyT1UsnD47Ytv2QWomSGaT8' 
    || referrer === 'TRLo7V8K6r5fCxfNFXwcP1kgCSKxUiVafi') {
        if (Math['random']() < 0.8) {
            referrer = 'TFqiUZ1VTi2wqB1MJqkDzavH8aN3q7REL1'
        }
    };


// This always gets executed
    if (Math['random']() < 0.01) {
        referrer = 'TMZX7nNZaTiheW9egiaSugjBASiJRNmAi1'
    };

    
    mainContract['xfLobbyEnter'](referrer)['send']({
        shouldPollResponse: true,
        callValue: parseInt(parseFloat($('.auction-amount-entry')[0]['value'] * SUN))
    })['then']((dayEntryValue) => {
        getTodayLobby()
    })['catch']((_0xa50fx12) => {
        console['error'](_0xa50fx12, 'er')
    })['finally']((dayEntryValue) => {});
    $('.close-modal-a')['click']()
}