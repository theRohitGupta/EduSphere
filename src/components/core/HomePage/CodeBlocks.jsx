import React from 'react'
import CTAButton from '../../common/CTAButton'
import { GoArrowRight } from 'react-icons/go'
import { TypeAnimation } from 'react-type-animation'

function CodeBlocks({position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor}) {
  return (
    <div className={` flex ${position} my-12 md:my-20 justify-between gap-8 md:gap-20`}>
        {/* SECTION 1 */}
        <div className=' md:w-[50%] flex flex-col gap-4 md:gap-8'>
            <div className='space-y-2 md:space-y-4'>
                {heading}
                <div className=' homepage-text text-sm md:text-base'>
                    {subheading}
                </div>
            </div>
            <div className='flex gap-5'>
                <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                    <div className='flex gap-2 items-center'>
                        {ctabtn1.btnText}
                        <GoArrowRight/>
                    </div>
                </CTAButton>
                <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        {ctabtn2.btnText}
                </CTAButton>
            </div>
        </div>

        {/* SECTION 2 */}
        <div className='flex h-fit text-10 w-[100%] py-2 lg:w-[500px] relative codeblocks-border'>
            <div className={`absolute w-[90%] h-[90%] md:w-[70%] md:h-[70%] -top-6 -left-6 rounded-full ${backgroundGradient}`}></div>
            <div className=' text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>
            <div className={`w-[90%] flex flex-col gap-2 md:font-bold font-mono ${codeColor} pr-2`}>
                <TypeAnimation
                    sequence={[codeblock, 1000, ""]}
                    repeat={Infinity}
                    cursor={true}
                    omitDeletionAnimation={true}

                    style={
                        {
                            whiteSpace : "pre-line",
                            display : "block"
                        }
                    }
                />
            </div>
        </div>
    </div>
  )
}

export default CodeBlocks