import { useState } from 'react'
import Sunimage from '../assets/Clearsky.png'
import Blackcloud from '../assets/black-cloud.png'
import FewCloudy from '../assets/FewCloudy.png'
import Mist from '../assets/Mist.png'
import Rain from '../assets/rain.png'
import Snow from '../assets/snow.png'
import Thunder from '../assets/thunder.png'

import axios from 'axios'
const Landing = () => {
    const [ip1, setip1] = useState('')
    const [hmdy, sethmdy] = useState('')
    const [wspeed, setwspeed] = useState('')
    const [text, settext] = useState('')
    const [temp, settemp] = useState('')
    const [img, setimg] = useState('')
    const [icon, seticon] = useState('')

    const funcadd = () => {

        if (!ip1) {
            alert("Enter City Name❌")
            return
        }

        const data = axios(`https://api.openweathermap.org/data/2.5/weather?q=${ip1}&appid=88571fb4d26cca70d9d0cc83cd9946a7`)


        data.then(
            function (items) {

                const tempC = (items.data.main.temp - 273.15).toFixed(1)

                settext(ip1)
                settemp(tempC)
                sethmdy(items.data.main.humidity)
                setwspeed(items.data.wind.speed)
                setip1('')
                seticon(items.data.weather[0].icon)
                console.log(items)

                const iconCode = items.data.weather[0].icon

                const weatherImages = {
                    '01d': Sunimage,
                    '01n': Sunimage,
                    '02d': FewCloudy,
                    '02n': FewCloudy,
                    '03d': Blackcloud,
                    '03n': Blackcloud,
                    '04d': Blackcloud,
                    '04n': Blackcloud,
                    '09d': Rain,
                    '09n': Rain,
                    '10d': Rain,
                    '10n': Rain,
                    '11d': Thunder,
                    '11n': Thunder,
                    '13d': Snow,
                    '13n': Snow,
                    '50d': Mist,
                    '50n': Mist
                }

                setimg(weatherImages[iconCode])
            }
        )
    }
    return (
        <div className="min-h-screen bg-[#E3D8FF] flex flex-col items-center justify-center">
            <h1 className='text-2xl  font-bold mb-10'>Weather Reporting App</h1>
            <div className="bg-[#4230BD] p-10 w-[80%] md:w-[50%] lg:w-[30%] rounded-2xl">
                <div className="flex gap-10">
                    <input value={ip1} onChange={(e) => {
                        setip1(e.target.value)
                    }} type="text" placeholder="Search" className="pl-5 w-[75%] bg-white p-2 rounded-3xl" />
                    <button onClick={funcadd} className="bg-white cursor-pointer p-2 w-10 rounded-full"><i class="fa-solid fa-magnifying-glass fa-xs " style={{ color: '#566566' }}></i></button>
                </div>
                <div className='flex justify-center mt-10'>
                    <img className='max-w-30' src={img} alt="" />

                </div>

                <p className='text-white text-center mt-3 text-5xl font-semibold'>{temp && `${temp}°C`}</p>
                <p className='text-white text-center mt-3 text-3xl font-semibold'>{text}</p>

                <div className='flex mt-10'>

                    {/* Humidity */}
                    <div className='flex-1 flex gap-2 items-center justify-center'>
                        <i className="fa-solid fa-smog fa-xl text-white"></i>
                        <div>
                            <p className='text-white'>{hmdy && `${hmdy}%`} </p>
                            <h1 className='text-white font-bold'>Humidity</h1>
                        </div>
                    </div>

                    {/* Wind Speed */}
                    <div className='flex-1 flex gap-2 items-center justify-center'>
                        <i className="fa-solid fa-wind fa-xl text-white"></i>
                        <div>
                            <p className='text-white'>{wspeed && `${wspeed}Km/h`} </p>
                            <h1 className='text-white font-bold'>Wind Speed</h1>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Landing