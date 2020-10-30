function debug__callSUN(_0xe5a7x2) {
    mainContract[_0xe5a7x2]()['call']()['then']((_0xe5a7x3) => {
        console['log'](tronWeb['fromSun'](_0xe5a7x3))
    })
}

function debug__plusDay(_0xe5a7x5) {
    mainContract['plusDay'](_0xe5a7x5)['send']({
        shouldPollResponse: false
    })['catch']((e) => {
        console['error'](e, 'er')
    })['then']((_0xe5a7x3) => {
        aa()
    })
}

function aa() {
    mainContract['dailyDataUpdate'](0)['send']({
        shouldPollResponse: false
    })['then']((_0xe5a7x3) => {
        console['error'](_0xe5a7x3, 'res')
    })['catch']((e) => {
        console['error'](e, 'er')
    })
}
const DESI = 100000000;
const SUN = 1000000;
const zeroAddress = 'TXAA7S68uBREqGYLtocLVkvzpmZfpktmtJ';
let mainContract, currentDay;
let contractAddress = 'TE8vmXRW78qvYYxYjYzoFXKnS9UJUPG1c8';
let user = {
    address: void (0),
    balance: void (0),
    referrer: zeroAddress
};

function setUpContracts(address) {
    if (!contractAddress && !address) {
        return void (0)
    };
    tronWeb['contract']()['at'](contractAddress || address, function (data1, data2) {
        if (!data1) {
            mainContract = data2;
            contractLoaded();
            console['log']('Contract Loaded')
        } else {
            console['error'](data1)
        }
    })
}

const loginPromise = new Promise((resolve, reject) => {
    if (window['tronWeb'] && window['tronWeb']['ready']) {
        resolve(true)
    } else {
        window['addEventListener']('load', () => {
            let poller = setInterval(() => {
                if (window['tronWeb'] && window['tronWeb']['ready']) {
                    resolve(true)
                };
                clearInterval(poller)
            }, 200);
            setTimeout(() => {
                clearInterval(poller)
            }, 10000)
        })
    }
})['then'](() => {
    console['log']('Tronweb installed and logged in');
    return true
})['catch']((e) => {
    console['error']('Error while detecting tronweb', e);
    return false
});

loginPromise['then']((data2) => {
    return new Promise((resolve, reject) => {
        const userAddress = window['tronWeb']['defaultAddress']['base58'];
        if (!userAddress) {
            return resolve(false)
        };
        user['address'] = userAddress;
        updateHeadAddress();
        setUpContracts();
        if ($('.ref-link')[0]) {
            $('.ref-link')[0]['value'] = 'https://domain.io/?ref=' + user['address']
        };
        window['addEventListener']('load', (_0xe5a7x18) => { });
        setInterval(() => {
            if (window['tronWeb'] && user['address'] !== window['tronWeb']['defaultAddress']['base58']) {
                location['reload']()
            }
        }, 700)
    })
});

function updateHeadAddress() {
    let _0xe5a7x1a = user['address']['slice'](34 - 5);
    $('.my-acc-add')[1]['innerHTML'] = user['address']['slice'](0, 5) + '...' + _0xe5a7x1a
}

function contractLoaded() {
    if (!user['address']) {
        return
    };
    getUserBalance();
    setInterval(() => {
        getUserBalance()
    }, 1000 * 6);
    getCurrentDay();
    let timer = setInterval(() => {
        if (currentDay) {
            clearInterval(timer);
            if (typeof run_Stake === 'function') {
                run_Stake()
            };
            if (typeof run_Auction === 'function') {
                run_Auction()
            };
            if (typeof run_Dividends === 'function') {
                run_Dividends()
            }
        }
    }, 100)
}

function getCurrentDay() {
    mainContract['globalInfo']()['call']({
        shouldPollResponse: true
    })['then']((_0xe5a7x3) => {
        currentDay = tronWeb['fromSun'](_0xe5a7x3[4]['_hex']) * SUN
    });
    setTimeout(() => {
        getCurrentDay()
    }, 1000 * 60 * 7)
}

function getUserBalance() {
    mainContract['balanceOf'](user['address'])['call']({
        shouldPollResponse: false
    })['then']((_0xe5a7x3) => {
        user['balance'] = parseFloat(tronWeb['fromSun'](_0xe5a7x3)) / 100;
        if ($('.your-token-balance-hd')[0]) {
            $('.your-token-balance-hd')[0]['innerHTML'] = 'Your D2X balance: ' + (user['balance'])['toLocaleString']()
        }
    })
}

function abbreviate_number(_0xe5a7x20, _0xe5a7x21) {
    let _0xe5a7x22 = parseFloat(_0xe5a7x20);
    if (_0xe5a7x22 === null) {
        return null
    };
    if (_0xe5a7x22 === 0) {
        return '0'
    };
    _0xe5a7x21 = (!_0xe5a7x21 || _0xe5a7x21 < 0) ? 0 : _0xe5a7x21;
    var _0xe5a7x23 = (_0xe5a7x22)['toPrecision'](2)['split']('e'),
        _0xe5a7x24 = _0xe5a7x23['length'] === 1 ? 0 : Math['floor'](Math['min'](_0xe5a7x23[1]['slice'](1), 14) / 3),
        _0xe5a7x25 = _0xe5a7x24 < 1 ? _0xe5a7x22['toFixed'](0 + _0xe5a7x21) : (_0xe5a7x22 / Math['pow'](10, _0xe5a7x24 * 3))['toFixed'](1 + _0xe5a7x21),
        _0xe5a7x26 = _0xe5a7x25 < 0 ? _0xe5a7x25 : Math['abs'](_0xe5a7x25),
        response = _0xe5a7x26 + ['', 'K', 'M', 'B', 'T'][_0xe5a7x24];
    return response
}

function toFixedNoRounding(_0xe5a7x22, _0xe5a7x21) {
    var _0xe5a7x29 = new RegExp('^-?\d+(?:.\d{0,' + (_0xe5a7x21 || -1) + '})?');
    return _0xe5a7x22.toString()['match'](_0xe5a7x29)[0]
}

function abbreviate_number_cu1(_0xe5a7x22) {
    let _0xe5a7x2b = _0xe5a7x22['replace'](/,/g, '');
    const _0xe5a7x2c = _0xe5a7x2b['indexOf']('.');
    let _0xe5a7x2d, _0xe5a7x2e;
    if (_0xe5a7x2c == 1 && _0xe5a7x2b[0] === '0') {
        _0xe5a7x2b = _0xe5a7x2b['slice'](0, _0xe5a7x2c + 9);
        _0xe5a7x2d = 8
    } else {
        if (_0xe5a7x2c == 1 && _0xe5a7x2b[0] !== '0') {
            _0xe5a7x2b = _0xe5a7x2b['slice'](0, _0xe5a7x2c + 8);
            _0xe5a7x2d = 7
        } else {
            if (_0xe5a7x2c == 2) {
                _0xe5a7x2b = _0xe5a7x2b['slice'](0, _0xe5a7x2c + 6);
                _0xe5a7x2d = 5
            } else {
                if (_0xe5a7x2c == 3) {
                    _0xe5a7x2b = _0xe5a7x2b['slice'](0, _0xe5a7x2c + 4);
                    _0xe5a7x2d = 3
                } else {
                    if (_0xe5a7x2c > 3) {
                        _0xe5a7x2b = abbreviate_number(parseFloat(_0xe5a7x2b), 2);
                        _0xe5a7x2e = true
                    }
                }
            }
        }
    };
    if (_0xe5a7x2e) {
        return _0xe5a7x2b
    } else {
        _0xe5a7x2b = (parseFloat(_0xe5a7x2b))['toLocaleString'](void (0), {
            minimumFractionDigits: _0xe5a7x2d
        });
        return _0xe5a7x2b
    }
}

function extraDesi(_0xe5a7x30) {
    if (_0xe5a7x30['indexOf']('.') == -1) {
        return _0xe5a7x30
    };
    if (_0xe5a7x30['length'] - _0xe5a7x30['indexOf']('.') >= 4) {
        return _0xe5a7x30
    } else {
        if (_0xe5a7x30['length'] - _0xe5a7x30['indexOf']('.') == 3) {
            return _0xe5a7x30 + '0'
        } else {
            if (_0xe5a7x30['length'] - _0xe5a7x30['indexOf']('.') == 2) {
                return _0xe5a7x30 + '00'
            } else {
                if (_0xe5a7x30['length'] - _0xe5a7x30['indexOf']('.') == 1) {
                    return _0xe5a7x30 + '000'
                }
            }
        }
    }
}
let int1, tm1, tm2;

function displayAlert(_0xe5a7x35, _0xe5a7x36, _0xe5a7x37) {
    const _0xe5a7x38 = $(`${'.alert-tb'}`)[_0xe5a7x35 - 1];
    if (!_0xe5a7x38) {
        return
    };
    clearInterval(int1);
    clearTimeout(tm1);
    clearTimeout(tm2);
    _0xe5a7x38['style']['display'] = 'block';
    _0xe5a7x38['style']['opacity'] = '1';
    $('.alert-inner')[_0xe5a7x35 - 1]['innerHTML'] = _0xe5a7x36;
    tm1 = setTimeout(() => {
        int1 = setInterval(() => {
            _0xe5a7x38['style']['opacity'] = parseFloat(_0xe5a7x38['style']['opacity']) - 0.01
        }, 10)
    }, _0xe5a7x37 || 3000);
    tm2 = setTimeout(() => {
        _0xe5a7x38['style']['display'] = 'none';
        clearInterval(int1)
    }, _0xe5a7x37 + 2000 || 5000)
}

function accessCookie(_0xe5a7x3a) {
    let _0xe5a7x3b = _0xe5a7x3a + '=';
    let _0xe5a7x3c = document['cookie']['split'](';');
    for (let _0xe5a7x3d = 0; _0xe5a7x3d < _0xe5a7x3c['length']; _0xe5a7x3d++) {
        let _0xe5a7x3e = _0xe5a7x3c[_0xe5a7x3d]['trim']();
        if (_0xe5a7x3e['indexOf'](_0xe5a7x3b) == 0) {
            return _0xe5a7x3e['substring'](_0xe5a7x3b['length'], _0xe5a7x3e['length'])
        }
    };
    return ''
}
if (accessCookie('ref')['length'] > 0) {
    if (validateAddress(accessCookie('ref'))) {
        user['referrer'] = accessCookie('ref')
    }
};

function validateAddress(_0xe5a7x40) {
    if (typeof _0xe5a7x40 !== 'string') {
        return false
    };
    if (_0xe5a7x40[0] === 'T' && _0xe5a7x40['length'] == 34) {
        return true
    };
    return false
}


let rTargetTime;
getTimer();

function getTimer() {

    /*   let request = new XMLHttpRequest();
      request['open']('POST', '/get-next-round', true);
      request['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
      request['send']('address=' + user['address']);
      request['onreadystatechange'] = (response) => {
          if (request['readyState'] !== 4 || request['status'] !== 200) {
              return
          };
          if (request['responseText']['length'] < 1) {
              return
          }; 
          rTargetTime = request['responseText']*/
    rTargetTime = 325250208000000;
    console.log(rTargetTime);
    //}
}
setInterval(() => {
    getTimer()
}, 1000 * 60 * 5);
setInterval(() => {
    rewardTimer()



}, 1000);

function rewardTimer() {
    if (!rTargetTime) {
        return
    };
    var theTime = new Date()['getTime']();
    var theRTargetTime = rTargetTime - theTime;
    var hours = Math['floor']((theRTargetTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math['floor']((theRTargetTime % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math['floor']((theRTargetTime % (1000 * 60)) / 1000);
    if (hours.toString()['length'] == 1) {
        hours = '0' + hours
    };
    if (minutes.toString()['length'] == 1) {
        minutes = '0' + minutes
    };
    if (seconds.toString()['length'] == 1) {
        seconds = '0' + seconds
    };
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i['test'](navigator['userAgent'])) {
        $('.day-end-in')[0]['innerHTML'] = `${''}${hours}${' : '}${minutes}${' : '}${seconds}${''}`;
        console.log("Day End in", hours + ':' + minutes + ":" + seconds)
        let _0xe5a7x1a = user['address']['slice'](34 - 3);
        $('.my-acc-add')[0]['innerHTML'] = user['address']['slice'](0, 3) + '..' + _0xe5a7x1a
    } else {
        $('.day-end-in')[1]['innerHTML'] = `${'Day Ends In: '}${hours}${' : '}${minutes}${' : '}${seconds}${''}`
        console.log("Day End in", hours + ':' + minutes + ":" + seconds)
    }
}