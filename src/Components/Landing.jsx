import { useState } from 'react'
import Sunimage from '../assets/Clearsky.png'
import Blackcloud from '../assets/Overcast-weather.png'
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


    const funcadd = () => {

        if (!ip1) {
            alert("Enter City Name❌")
            return
        }

        const data = axios(`https://api.openweathermap.org/data/2.5/weather?q=${ip1}&appid=88571fb4d26cca70d9d0cc83cd9946a7`)


        data.then(
            function (items) {
                const tempC = (items.data.main.temp - 273.15).toFixed(1)



                settext(ip1.trim().charAt(0).toUpperCase() + ip1.trim().slice(1))


                settemp(tempC)
                sethmdy(items.data.main.humidity)
                setwspeed(items.data.wind.speed)
                setip1('')

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
        ).catch(
            () => {
                alert(`City Not Found ❌`)
            }
        )
    }
    return (
        <div className="bg-[#E3D8FF] min-h-screen flex flex-col justify-center items-center">
            <h1 className="font-bold text-2xl">Weather Reporting App</h1>
            <div className="mt-5 bg-[#4230BD] p-10 rounded-2xl md:w-[65%] w-[70%] lg:w-[30%]">
                <div className="flex justify-between ">
                    <input onChange={(e) => { setip1(e.target.value) }} value={ip1} type="text" placeholder="Search..." className="bg-white pl-4 p-2 w-[70%] rounded-full" />
                    <button onClick={funcadd} className="bg-white p-2 rounded-full w-10 cursor-pointer"><i className="fa-solid fa-magnifying-glass fa-xs " style={{ color: '#566566' }}></i></button>
                </div>
                <div className='flex flex-col justify-center items-center mt-10'>
                    <img src={img} alt="" className='max-w-30' />
                    <p className='mt-3 font-semibold text-5xl text-white'>{temp && `${temp}°C`}</p>
                    <h1 className='mt-2 font-bold text-3xl text-white'>{text}</h1>
                </div>
                <div className='flex mt-8 px-5 justify-between'>
                    <div className='flex items-center gap-3'>
                        <i className="fa-solid fa-smog fa-xl text-white" />
                        <div>
                            <p className='text-center text-white'>{hmdy && `${hmdy}%`}</p>
                            <h1 className='text-white font-bold'>Humidity</h1>
                        </div>
                    </div>

                    <div className='flex items-center gap-3'>
                        <i className="fa-solid fa-wind fa-xl text-white" />
                        <div>
                            <p className='text-center text-white'>{wspeed && `${wspeed} Km/h`}</p>
                            <h1 className='text-white font-bold'>Wind Speed</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Landing