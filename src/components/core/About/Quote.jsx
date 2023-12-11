import React from 'react'
import HighlightText from '../../common/HighlightText'

function Quote() {
  return (
    <div className='flex px-[120px] pb-[90px] pt-[150px] bg-richblack-900 border-b-[1px] border-richblack-700'>
        <p className=' text-richblack-100 text-center font-inter text-4xl font-semibold leading-[52px] tracking-[-0.72px] relative'>
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="16" viewBox="0 0 21 16" className=' absolute left-[60px]' fill="none">
        <path d="M0.644531 15.9998V11.3975C0.644531 10.0907 0.900213 8.7555 1.41158 7.39187C1.92294 6.02823 2.59766 4.74272 3.43572 3.53533C4.27379 2.32795 5.18288 1.31942 6.163 0.509766L10.1687 2.87482C9.37322 4.12482 8.71982 5.43164 8.20845 6.79528C7.71129 8.15891 7.46271 9.6788 7.46271 11.3549V15.9998H0.644531ZM11.4045 15.9998V11.3975C11.4045 10.0907 11.6602 8.7555 12.1715 7.39187C12.6829 6.02823 13.3576 4.74272 14.1957 3.53533C15.0337 2.32795 15.9428 1.31942 16.9229 0.509766L20.9286 2.87482C20.1332 4.12482 19.4798 5.43164 18.9684 6.79528C18.4712 8.15891 18.2227 9.6788 18.2227 11.3549V15.9998H11.4045Z" fill="#424854"/>
        </svg>
        We are passionate about revolutionizing the way we learn. Our innovative platform <HighlightText text={"combines technology"}/>, <HighlightText text={"expertise"} colorTheme={"orange"}/>, and community to create an <HighlightText text={"unparalleled educational experience"} colorTheme={"yellow"}/>.
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="16" viewBox="0 0 21 16" className=' absolute right-[195px] bottom-[30px]' fill="none">
        <path d="M20.3544 1.53673e-06V4.60228C20.3544 5.90909 20.0987 7.24432 19.5874 8.60796C19.076 9.97159 18.4013 11.2571 17.5632 12.4645C16.7251 13.6719 15.8161 14.6804 14.8359 15.4901L10.8303 13.125C11.6257 11.875 12.2791 10.5682 12.7905 9.20455C13.2876 7.84091 13.5362 6.32102 13.5362 4.64489L13.5362 9.40664e-07L20.3544 1.53673e-06ZM9.59446 5.96065e-07V4.60227C9.59446 5.90909 9.33878 7.24432 8.82742 8.60796C8.31605 9.97159 7.64134 11.2571 6.80327 12.4645C5.9652 13.6719 5.05611 14.6804 4.07599 15.4901L0.0703125 13.125C0.865768 11.875 1.51918 10.5682 2.03054 9.20455C2.5277 7.84091 2.77628 6.32102 2.77628 4.64489L2.77628 0L9.59446 5.96065e-07Z" fill="#424854"/>
        </svg>
        </p>
    </div>
  )
}

export default Quote