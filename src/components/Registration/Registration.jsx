import axios from "axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ErrorToast,
  IsEmail,
  IsEmpty,
  IsMobile,
  SuccessToast,
} from "../../helpers/FormHelper";
import { HideLoader, ShowLoader } from "../../redux/state-slice/settingsSlice";
import store from "../../redux/store/store";

const Registration = () => {
  const navigate = useNavigate();
  let emailRef,
    firstNameRef,
    lastNameRef,
    mobileRef,
    passwordRef = useRef();

  const handleSubmit = async () => {
    store.dispatch(ShowLoader());
    const baseURL = "http://localhost:5050/api/v1";
    let email = emailRef.value;
    let firstName = firstNameRef.value;
    let lastName = lastNameRef.value;
    let mobile = mobileRef.value;
    let password = passwordRef.value;
    let photo =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6CAMAAAC/MqoPAAACJVBMVEVHcEz/VWn/UmaXVTP/bIH6oUb/yzn1bVLvgE/uaF//b4T/aX7/cIX/XXL/aH3/boP/ZXr/Q1T/yDn/xTj/Vmv/zTr/QVX/QVX/yTn/xzj/yzr/wjf/zDr/xjj/wDb/xTf/QVX/yDn/bYP/bIH/QVWQTCz/boP+Q1aJRyaWUTD/szL/boP/QVX/bYKUUjD/yjl4OBiPSir/QVX/3UB4ORj/szL/3UD/3UD/bYJ4OBj/QVX/sTb/x4b/QVX/yDn/x6v/cYb/qnv/3UCUUjB1Nhb+53//szL8lGDe7v//P1SSUC10NRX/q3z/yKz/qXr/cIX/xzf/bYL/30D/RFf/6YD/yzr/cof/TGD9w6X+54B+PByTUS//VGmeWjf9zEx4OBj/2Vv8u1X8QVP/20D/SFj/Znvl6Nfj6ef/roHg7vn+232NSieFQyH/tnr/YHX/UlSua0f/UGT/0j3/ujX/vpz/onH/1z//X1bx2ZG+gF/9l2L/Wm//sor01Xv/p3bLj2+jYT/6pXfcQ0f1vJ//x6zNRUHZnX7/wTf+m2v/cGH+5XfssZT/nkX/alC0dVT/wET/e0z+4mqcUTH/w3m9RTusTjivYjzvnW/ZimDip4rKfFP/30v2QlHllGiROSP+znzAdEzsQ07/jkj/zED/hGv9pFnt6L7/s0LjgVP/qkb66JD6iF3/uZT06qmvPDGhOyr00Gvqwzmxfijgu2js3KzWqTP/i4Xw8C4SAAAAPHRSTlMASSf9mRMnBg0a8Wr4M4TQV+X55T2Xa/M5TW9eqMjVvKnyv6aZMumKVdb14NfIrYbKgs/Qn67vvrDqwIoQueKNAAAabElEQVR42tyc20sjyRfHR6NovAuir4OON3SHUeZhZqDpDi0MSeeCBDIhbQhIBCEhE0GRrDKJJoYJ4ZeHwfXGZFGYh4WR3779/r5fdaeTdFdXdVdVOt7Owrqw0N2fnHO+59Sp7nr16kFt/v27dx8/JhIbwBKJxMflt2/Xlpbm+wdevXh7ryBvNC2xEfOJosu1vAx+gPnBl42+tgEZYJfBP+AHUPDdL9j78+9g9rTCrZpLwV9yv+iIh9hFvbmW1+ZfpusHTV5PJFJ6dBADrrdLLy/tB+bfJ0xe34jJImQA/mV5fn7p/ccNlKVE0Qw//2K43YA7sYE2pcKZbHntRQje4NL7dzhujNsV+PkX4HBLbpPI6xz/vOVucM0OHKi8D83uevuMg35gyR4coKMjHtjzVTs3RtOJ0Z9twi+92yAyXMA/V3b31NpHMnJEU6PvbJ8Zu7tncf08RkiOU/hnmO/9gHtm+zxBSh7zWaL/WF7seRZKPzA6/WmG45wjB+xnM5+mR596V++eeD3JAfOeOUcO2E85bvL1xFN2fe/0+gyn2mlMIs1ze3JR/OsOXHNmfbr3qUb64iqn2d3fxOQyAbksnm+r111dfIJxPzD1ZrIJzv38d8NJcqXEnWqXnnwzNfB0wSkSPeETCe2vn82LPyn4gVE9OE24p0RiO2tff/LNUwn73kUDOLf9XwfFvZXuqtK1PL/4FATPPb3OGe3UoS4OYj8z3GR1+rFL3WDPpzBEvv0vabgnUjTorWzX7FPPo0Z975sZjmN2OrnIwdmu2sybx4v6welVEziF02lSXRX5bfheq9OPNMEafW12OY3TLdeqmHYWdvzr0Udx+SSHMmJ5p/a6eG6+m3fy4R2PynK6mk6d6yIsdJrjHzbjBybWkeBkjZykWkvhZdnnk2W2iFduuT7xgFLvXkS73F7kFOREOiXGC9nbm6t8OQ8sl6vVsoW4S7T9Ac7QP/fM4oPV+N7XGHDOe5eWLLABdfzi9qp+eRL0+P3H0YBmfLRYrZbzuWzcZUlv1njNHiroe9Y5rGHjXZIA9u3V5YlfMQ9Av+dLPB8IgH/xyl/lFyhWywBfxNL/uMPdd7XnEZVd03cJAx6L39QVbI9mu/u82RT+4nU+65Jtlq6PovTuucwXPPlPpL5LG+ns1UkbG0eu4fPFcg0Df4a9czIz1+WE750NCTt72AdA9jNSOlsP6rk9SrRbGHB9OYsM+3Ncsu/tCKHZrib81LggCJHNLWyqI8BjF3WPEdzjOeatDcDn47L9EqZpW5sR8GDjU90jn1gRVAsdhUlTXUrdnMDgnt0ob2vRckEm1LnwUajxXCsTXSNfEARLdkRV/1E3gXv8+zyBBa6zMhF6i1wQFrrEPjwktGzziEzl4pcI8l2eyAJVMztK4tvkgjA03IXObkBPDti3CFROQpF7PPslMnb+2hTzZ6g81z9XF9ghcsBurnHeU2NDI/mQ5CSZrlnZZYfu/bJpfC7H2U3kQmQnaSPwUvoKRW4r73qty8k269bkDvRcjrObyIGZ0t17bkh16TaIIiePd2BVKORNhf3I9FiRoWFHtR1BDkLea1XbMOEO9J0CnYfcDi1gTOGu+b0bVc1gGevadoskp0l1ReWNnQ28dsugniviXI3rWUGSm9xuQJfSlxh0nsaiNdnQzm3bO13pbRxayI2OCxiDsn1bX9alAjrTaVRO6WjzIh4dkema38cdGVe6Z3HkAiTyBvSNG78D6KCn00c8hG6W9xa7E2sZ9wcsuRDa82LRY3U0epASvVjAonv3Qvhn+9DfcUHvs7h85Ajbx0qpS0e8zkezeK8fRSzc0tdpeR8eESzQd8JYdN8JmpxS5njeoHMG9PCOBbow0mGJ61kQrGwziUWP49BpvW5AN7Q0yU3Lh1voSOZ7xwVrdEN52yZC78jr5ySlTQvJyHgHUtf/wZoc0rntB/A6qcp1KnVjdtcObWHRfziDXjKi61du3i27xxsZ61KiK2ZE13VzkohDv+9A4SF028djTXf3H0IH6DiFp1u9AK8b0A1TGnv0yB9uxys6Ozplqhu9bthwJPA6Y3VHLlQtc12/aMXJHKXToVw3jCXtc11ZwE44X9dQney5bvWSDTridOOK3TCHt1d4xegr3EAfwWWhuu7VDagS6OHULqXTwdJNN5+DWnjrus4c8iThDndzXHssKYmXfmecHijqkt04n0qSoFOHPIm6m3p4b3sYHUMvWYO0Tje6HXpt0LqHb9ms29lmpoGeCaNfpMGJHNVwCtHPQegZIvQQVWMzuiIQoWPGNFIMnenBY57FWtMK+GWaIyJ0YYViZDMwJ5DZEXo4h23g75nQW26Htty8R4SPOUeudD1DZJeEynqrsCdww6n7EhN7GTOK3gqRBecQcT/bP0v4a0Jlvbn9IqUxwyn/PhN6qbkRAW1AkBV2Ven6nZjMWE2jvacJ9ZU4XLwzqRwQ+WjNJyuvVsE7bl9I0UknNmSFDbn/8vPi4iKeimE2H1jR+UDedXF7c3N7x3EcdU+jGuEyZjjEiB4+/P0Z2O9/6g6j89W6GkcHlTAjeojI7e5xgRzd4IXDz5p98ziLXtrfbVzgW8UY8MTowrjbUadD6MnfGvmfTqPzUQ3d/z3J5nUit1M4HUJvOd0CvdQZusdTYfQ6idspnA7lesUWnbG4AYlvogd/MXqdQOSJazoLumc/0KHX/czo9rV9YoQR3ZskQL/nHw99xGbxOviB4mJQN9c99NJ+s1r6K0zdXGMqb93JTw1Roet7eG9L5j4fYMgZV2469GCFoYdvziys3yPtE6jMsHz5+tsOnXrTqSlz902nH3ylHMnqrc9yFrlCda2IYdEabkX8d4/Dhb2F/itsWLRGqJ7WckI5HKJDz6C7ue9Bhwv7MSreOS5DhW7Z1gzOCpToYWQ7h0VnLezHqGaOdEClq2+DDomcaSzZ0niLwl7qqI+tQGNJuse1EroxykvBw+im0Dld3TR0/4Hx+4vkJuXjRsacaN/Rq9aKncQfd1LbjCJH2dFYN/I9I7SXgodzh11B5/eRIkdZ1tWOrseZom6qbu2IP3C2ut0jijr5LJqgtNPHO1zduPDvrhR2TeC/Q6+hZ+jRMRFPH+8miW9qPL6wM0n8MSrVSfedSCKeWt/NEs/9R5N4gsIeCOj/kAh8hetM4LEaT9vPIGeyX8mGFcoXvNVqNMAHlD92+A10/7dDb4cCj+tqRocYrgRLvJbsfx5YDCuUTzev89lCoVYNVGuFQjZ/XbSi12rb7q8kJPAMzysMofbfhlmuBG84Nt1+gPU68HM5V3DJwHzZ66yytyC7Crky3vkNdOB0rmOBx/Txc0zo0DYzFz608Lo/eFnO1wpi6yP1eHPjXBYLNdX5OHR/sALfKcOCLsw5UtrUV+Lhzxwb+xAodP/JVdYnyvqP83X/Cdwfz+auowEUuj94UDHdaIfpgRHlbWqE6Urmz93CycNK5Tvio8b6RUyyPI/FJ4vxXBVmL5WOK5WK+as6JpUD5W3KmVRHbLaqCuT9ZUIP3qQkyfbUKVkulE0zmv95OfNNKAdzbRtmfpvAckbVfKztClzYg7cxiezUqXgZ9vovL+qcgi22543MOZTqZonXNtqhF6iCN+phk/BJNC6U4yH2QPEfFDqbwKOSnamqoyS+ke9nt0anXzWO2TSiy3Hk9/ly/Fqf76U88pgGRoFHVPaJEUb0HeSX7Gcp/Uazv56SEOcPybViDSV7clandYFqAXk4B0sHj96KGGMUjdBmEpWIp4mLE11Vu5BQJ8y5yoEy+jyOXFT3RS/6EKLkJqM4mdr4D4wXQn3MrbxBF0vctNGvWqfKpo2AgWgOLXXtkC+70Kc0fGFFh5saVpVDfdSrnkr0t+4T7pO4ZD5nTRZzRdDPF2uoo0h8Lbdfx9Fnc3iZ0eF35EcXHEVX3qCTUhq7zunaGaJK257NFwOqfisn8MDHL8nxRrYHrguyjDyRhR1dWOh1opdT0PeQVfdc+crvSj2Oxp+VDAetKauVdr+uLuNqBejwKV9e/V/qKSVIgWfuaEz93LDgrNfVl6Sl9K1yMMuJT/+VbyyeKytr1ID++CW+CFZzhuY+G22eTYM5am2P2etQP9cXchbde6e8JC0lCvWgv66Ldyl9UY8iFqcBsJbN6Yt8vMpfN2QArXIdBLww1uEw1lrhm6/LKocw3bTBE3GQA5jxXKDJ2rC89kvImMOXOkCfY3+jwHI6p0v2xplj6XQ72NUEOMa/9a/v7prxjzlyi7muCxHDOwbstQ3TzenOqJGkVrDfqLKHH0hrukZ0xhxzNwd18b3MtQ2exLe8bjqZqF3o72lO4cGduMVlIo5UN9bFC2bRCn/+BJ1Sc2y1D1GGVjS4I+ZYF63wAub/3J37TxtXFsdHSYyJtpUWEt4Bgho1Upoq0kZJVkUeickOxOCAGYPTweCAbMiGl3lsIXESSFXtmrimtoNE0rArIiC8Vkhpmv5/O+PnPO7b9mDt+aVVq5D58D3n3HPu3Dn3yy+KvLZlc7xmQX9H+JZ91Uc0U7GAck6Hztq3QXrWtMfrRrXoBpY817+FQE2igQ7XY+9a9b3bn1iX9T6ovxtHyj7UnBTPyv7Tz9+bB9Hogx06TZLlRStoQ5q1ZYXmd/MINt3wiufpteyXkacm9lWyJFdIjtd9AsXcrQ/Dn8zpNNx6s5kfN5iS/f6vZ7tHDBuwBtHP/hMxvdTBKrsOnbWOnfWgHs2wvg1pxnE9T33bkNqt0Bc1+m0blOhqtDOinysY3Tv+APVkTkO09wy9yw8W/Uca06fz+Ps/PcUPFdQWs+NFQGfsV5EP5nT8u1s/hW1oLhfvSkm3eja1/XpfM0ZUT+7bDDmcyL+CsX0rGL1/GAkeXN6J/6G/76jn4evsKF3X83Tt4nv5a7pxV3q3f80Z9it+31h7FUTCD7OwewtFR6Y4RyhxtCtIgU/Ganbo5ds3HS7Xj//JTkf2vVz9+XvwyOCn4oA4ObOHlJ4p1RWIjtDc6VEED0iCIEi/dfeYpkd3b87NjUzndulSL1lXn5oGRXfPvRgQVdteW/Y4i6l7Yap74XHuDK7HFMGFlEl/mK/4Sk/G1+zN+rrV4fimlzC/p8kVm1xB+P18v9dS1aG5XQE/Wspwp9g/PWS842hVzNvA5AwcnjbPewtRvW82CFtq9eCKLX1iQ386KWrZlaB/BXP74LM+i1T3jg/DKplQbEEProb73R569O5fXgyIBpv8YRn2C58ftyLWvf3PYM4eTMQFs5lTHR7dN/fRRK4mvD2YtwWf0UQ8UzXn7ZuF5rdQbEkAoQu/TfXQXW3VDSYXxajxrGhOd8f8bJ+3hIWst0/xdVi2WT4QILZwCGCfRmn+ZhJILsrixjJ0RR0e72NAJ+rcVPAgdH1dj0sQcskfPnxNc9WPUu5C0FWnfwVvZxR4EuVpm1Y0OIJcEPxdXYcjD3vIbjTz3X3/xuXaFlnYHUEieB06dk5BytURtXQIQS6MdXWF/7tprG3AHu8bUW8R6EWgw32eVHnd5624Q9H9s/MeVBsRPBIEJHpXuOudIeDBsr98qzb1vRsIdHEliGqbPPOzmNpWdzwavRndP/vAg24eE0sI8qWx9OFRo9MDov3s+3RX60KiR/fQzbLnARJevyOLQPcq4JiuGe3uQuBD5rh01/upv/XAL2n13d18m9nDQqs+sBFyYHYKkPA6dOhXjco6jlNc+ZsSAZS/Cx9y3/kebk739IDZfXdH3uU2MlwzKHQ5uod9JAUeGvPfnCEYStI3Po8FVyMdJXpO9ZTwh0q66zFfyOzzjbx/k9++6kWii/JMEPtQSszD1nndiRL7X8Gno4YJwB3O5V2BED0V8q818ENTvgy4/kIgNLo4uUzyXEq2B5+XtGPer6eCnMRw/r6kR1fgN6fSo3vU292GprrPvlSvvtIdrsSgi3tOokdTQt6LLuGBNc34vIPMPGh/N6Mr8O82X09NDw0NTU9PKYK/Md2EhEEfWPEQPhygpzMMYTO+dFP6s6CT8KeH4gItejisTu45PFRvtfux12U+Ro1Dx+V4zdaJqaczHJc0rm7EkquhvkCNnuFfc0HGFmFVJwp2iPBffIn4Zr/vWdBBjo4JdWOa0xj0S0BsrIuvyNGNuzjfnIF+6eVFb7Cb0HeY0aHfRbmw6HsU6Ephry1wjN97fUWw5QhDl4qOjlV9YM1J9ZDarcuvYCej4VuOMIth0AUoOvQz944NHPoPdOjO4Gwf+NhcvneD3lLHjh4Yg5DDv/DvxaPTPmXu1jfTZ62ZM1T9w9TkHmZ06Ee/6H6dDT0X8F+fAX7RSpfgMr6Edfg4bYLv6NgussNr3lGZv2o9h39rDDFsmvPTZrkO13aR05zmnfQ50EgaNnLs4ib4w9Tok0Vd3LTsfX8GfMjMRo4vaWDlHCLLYZd1qpJGxw74lNn27bCDDR1XyMIWdkSWw6LTFLL6eP8WMHbuqoPRcO0LLMUj/B23tonbrOiOq6BRFXUskntCiRhOdUiKX2HPcnLyILHsYaGvAw2rOHOdmtsRWt85cPM4dAmY56DzLDpc2Cw3MCoFdo8SuFNGALsOmj5mv0zJHVS4I4M8zw8GWIId7u/4UI9uqb/RQDy2Tkt/GThqsJaqNlpOHEX4jC2xBHsBoS4nM+4kLcV31oMU9J5a8Jy9KpoAj/CDWXKox2+pBlnZ4fkdH+riqOYV9sLBDnnYV4Gn7VVeJgzwRGxRww3x+K3RZDKasmRya+sDlb9jQl1O+XueniLsL0NGa9aSJjYdN1D2rWRUlGU59aDKP6Iz5PUMvm0Tk6ZEShr2tbAbIKpwTe/yTj7AUbJvKeD6dThM3Lq4cP5uEJ0m7Ktg0yWROd6pJLYYkNss+2hUNp0EIRd9hjzSDSdX1LBHbiRfho6SraUJcL3smiQvjYqy+aU4cb+Ka1jlJLyAwIR9XS18lup12DFAUIDDXH4rKgOK7jVi0ScJ1nRE/RTYja1DpL+OmKZ6BXLwM8JjLefyUlIGPfAMWXrHLuoDowLWlg4SQPgrqFtP6gDnH2ORQZ7Asi4/CnlpECZa0ztwoicFCc8uLR2se8jq99zS/p2pLdshA8+FO1h0RfYNEnfH7soltwQik5ZipndT31WiJicbE936AU9saXZlXYO02NloDyPcHRPpMil5ql9MeMgWdUCic4YSEZ6nZIeIrsoexpJjalgqckFa2NG9UvgL5lK7q7qTn26ep2WHoovRFSw5ppCjIleT/VEIs0kBruicoRhPa4MLUH9XXT6MIe/4O8LdZTEpUFpA0LBX4e73sl/Ja84zmN+0qMv5/7ARXlvpIHN32fRjoqMCgx3k2K9gr/e6WJdZzVnI3Yud8aSuljs+mZjYP86Fey+KPP+m7Xh/Yv9ED5/08wsBBvas7nUX8Xe5pQt5zw4DeWSxUzGt8McTj+/du/cowy5PzvSSZPeTR8oferwvayXfNZTLxE4fC2LKd6PsdLk9Q96Ztni+iN+/l7IJOfcNSy+e/PhR+k+d5KPcn82j9MIHEthyRif78iKLs2ftwJ/x+izE4+NcqoOxa1b0k8faX5jS7ackz9TL9Oy7604y0VOyM6S4SJ5chR+N6tBPcq67DWbXkEczrpKJEy04k9NLSqqrI7vHT0nyCXdh5Gl4WTx+bESH6K6r4jToSpD7Ef0xocvvEKT3jOxVB6xhrrX4aBSEDtJdSz6gUT2a9KP3Bshkj1dd5Ait3V0EchX+xSMzuprr0O1aDh0EzhTw7cRXdla00JEvdkJsDISusG/oz8tt6Mhzqk/4YRLQsUs3K8gvam2sZkvtCHRZYwPytnby5LasMzGPDt8YoWEPNFLczmtrLQp5Hv3JqMH8YznzG//fEzy6m4b9jo0CnWtoKwZ5Hv2Fm9c7bxz4r+rPc7sJ0Gl0v91Ad/16TTHIdeiGNA3/iWToxLpLNZQXsBNmOjQ5Ah31M4nQiXWnyXFpa2ornLy06ES6S7ebaMm5yppCVjUr0Ml0p3V3Mpd3RzpPFx3PLtG7O5HLY8lLjo491MDg7iRZHk9eenRMPS+xuHvq67fmQlKcJeiYczx3KjhGq79QQIqzBh2Z5m/Xc8yGqOUJ3N0KdB5xdI2qdidf4YjILUGHhrtUU1kAOne+tQB3twYdusKxB3om3FsKEN0adDd4MMrNeq5AA/Zw7sUyQgdnecp+DZzq2hjKOEvRgZmusXByrvKGKc27O8sL3Sx74Ia9COicrYZVdKvQTbJLNTauKGa7xBbp1qEbZb9UJHKliWtlSe8WohvamEKXNR17M/2abin6QqnIObuW3V2G6FqPv1lMcrW0aWbwd+vQNR5feCkDZy9L9IXSkWvYF8sZvRTk+TxfluiZYL9TwXGlY3eXMXqpyJUW9hJNFWs5unSpZORqTVtNhX4wkUH/SIP+InuWZpcKPVBj40polY1tNOidn9PkNPrxvD/zC3tCc04zcLuxkiup2Rsv0KCPpd6VP/pId1QhfRhjn+b3NXi7kSu5NbRQsT/Zn/hMSc4Pfvw8sf+Eiry5gbPAKm7RsHfGd3k39YEsfneX6s+UMsHpkl37NQp0emxqa7th46yyppZyIm9psHPWWcUtQuEXSw5ebZWz55yeMNOXnPxCo42z2Oz1t8pA9OrWeu4UzNaOFz7yfyd5to/FRfyiu7RRXs+dmtkwqb6k/t7SVMmdplUg1/hIKdfyCu6UzY7y+pKht12qt3Onb5VNrdesRa9ubajkysNsTc0Wolc3N9m48rHzTc3XrEEvM/A0PMDtI8V39bIDT7l9gynhRYqd3BrKETyV8OrbW0q3rl+oqa/kytbs9opGrd8XD72ttbGCK3ezNbS3XCuux1e31JStpxu0P990K0O/WBTupv91awcpAIJAFIZn42RbByHNSeYErlp1/3s1A22DKAj0v8H3EEQQoaNwjab/+n4R7sx9XXfp2OnDiQ9UW5qh0zzmVknesVf00HcOUy783C/EpSV0MEaT+ZsOQHL71zoIGTqreoLR8g4XXSCWypuNEMyr4I1riWpe/kWf5XtNSMuLAowAAAAASUVORK5CYII=";
    if (IsEmail(email)) {
      ErrorToast("Valid email Required");
    } else if (IsEmpty(firstName)) {
      ErrorToast("First Name Required !");
    } else if (IsEmpty(lastName)) {
      ErrorToast("Last Name Required !");
    } else if (!IsMobile(mobile)) {
      ErrorToast("Valid Mobile  Required !");
    } else if (IsEmpty(password)) {
      ErrorToast("Password Required !");
    } else {
      try {
        const URL = `${baseURL}/register`;
        let postBody = {
          email: email,
          firstName: firstName,
          lastName: lastName,
          mobile: mobile,
          password: password,
          photo: photo,
        };
        const { data } = await axios.post(URL, postBody);
        store.dispatch(HideLoader());
        console.log(data);
        if (data?.error) {
          ErrorToast(data.error);
        } else {
          SuccessToast("Registration successful");
          navigate("/login");
        }
      } catch (error) {
        store.dispatch(HideLoader());
        console.log(error);
        ErrorToast("Registration failed! Try again");
      }
    }
  };

  return (
    <div className="container">
      <div className="row  justify-content-center">
        <div className="col-md-10 col-lg-10 center-screen">
          <div className="card animated fadeIn w-100 p-3">
            <div className="card-body">
              <h4>Sign Up</h4>
              <hr />
              <div className="container-fluid m-0 p-0">
                <div className="row m-0 p-0">
                  <div className="col-md-4 p-2">
                    <label>Email Address</label>
                    <input
                      placeholder="User Email"
                      className="form-control animated fadeInUp"
                      type="email"
                      ref={(input) => (emailRef = input)}
                    />
                  </div>
                  <div className="col-md-4 p-2">
                    <label>First Name</label>
                    <input
                      placeholder="First Name"
                      className="form-control animated fadeInUp"
                      type="text"
                      ref={(input) => (firstNameRef = input)}
                    />
                  </div>
                  <div className="col-md-4 p-2">
                    <label>Last Name</label>
                    <input
                      placeholder="Last Name"
                      className="form-control animated fadeInUp"
                      type="text"
                      ref={(input) => (lastNameRef = input)}
                    />
                  </div>
                  <div className="col-md-4 p-2">
                    <label>Mobile Number</label>
                    <input
                      placeholder="Mobile"
                      className="form-control animated fadeInUp"
                      type="mobile"
                      ref={(input) => (mobileRef = input)}
                    />
                  </div>
                  <div className="col-md-4 p-2">
                    <label>Password</label>
                    <input
                      placeholder="User Password"
                      className="form-control animated fadeInUp"
                      type="password"
                      ref={(input) => (passwordRef = input)}
                    />
                  </div>
                </div>
                <div lassName="row mt-2 p-0">
                  <div className="col-md-4 p-2">
                    <button
                      onClick={handleSubmit}
                      className="btn mt-3 w-100 float-end btn-primary animated fadeInUp"
                    >
                      Complete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Registration;
