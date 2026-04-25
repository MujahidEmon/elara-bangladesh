import React from 'react';
import DefaultButton from '../shared/DefaultButton/DefaultButton';
import Image from 'next/image';
import { useTimer } from 'react-timer-hook';    
import bannerImg from '../../../public/109.png'

const WeeklyDeals = ({ expiryTimestamp }) => {

     const {
    totalSeconds,
    milliseconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called'), interval: 20 });


    return (
        <div>
            <section className="bg-[#ecedec] w-full rounded-2xl my-24  drop-shadow-2xl/30">
                <div className="max-w-7xl mx-auto flex md:flex-row flex-col-reverse items-center justify-between  px-4 md:px-0">
                    {/* For TSX uncomment the commented types below */}
                    {/* For TSX uncomment the commented types below */}
                    <div className="space-y-6 w-1/2 text-center flex flex-col items-center">
                        <h1 className="font-semibold text-4xl">Weekly Deals</h1>
                        <p>Don't Miss ওয়ে Out - Gear Up for Victory with This Week's Unmissable Deals!</p>
                        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                            <div className="flex flex-col p-2 bg-white rounded-box text-neutral">
                                <span className="countdown font-mono md:text-5xl text-2xl">
                                    {days}
                                </span>
                                days
                            </div>
                            <div className="flex flex-col p-2 bg-white rounded-box text-neutral">
                                <span className="countdown font-mono text-5xl">
                                    {hours}
                                </span>
                                hours
                            </div>
                            <div className="flex flex-col p-2 bg-white rounded-box text-neutral">
                                <span className="countdown font-mono text-5xl">
                                    {minutes}
                                </span>
                                min
                            </div>
                            <div className="flex flex-col p-2 bg-white rounded-box text-neutral">
                                <span className="countdown font-mono text-5xl">
                                    {seconds}
                                </span>
                                sec
                            </div>
                        </div>
                        <DefaultButton text="Shop Now"></DefaultButton>
                    </div>
                    <div className="w-1/2  flex flex-col items-center  justify-center">
                        <Image src={bannerImg} alt="Banner Image" height={250} width={250} className="hover:scale-110  duration-300" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WeeklyDeals;