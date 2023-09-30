import React from 'react';

const Logo = ({ filled }: { filled?: boolean }) => {
    return (
        <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='512' height='512'>
            <path
                d={`M0 0 C4.71376575 2.63568723 7.01173035 5.02216188 9.4453125 9.8125 C10.04102051 10.96049072 10.63672852 12.10848145 11.25048828 13.29125977 C11.70878021 14.19873459 11.70878021 14.19873459 12.17633057 15.12454224 C13.79180297 18.31822609 15.4618282 21.48331768 17.125 24.65234375 C17.4556546 25.28534897 17.7863092 25.91835419 18.12698364 26.57054138 C30.42339181 50.03507409 45.70146287 72.25737461 62.625 92.625 C80.60804895 114.4265911 91.15075064 138.43333042 88.72265625 167.296875 C86.50811559 185.9411983 79.61481444 202.24666568 68 217 C67.48050781 217.68578125 66.96101562 218.3715625 66.42578125 219.078125 C52.34879068 236.52366496 30.22581847 246.74303048 8.37890625 249.6875 C-16.24023392 251.9644147 -42.49700091 246.12731963 -62.0625 230.4375 C-63.72706781 228.97944808 -65.37503825 227.50206548 -67 226 C-67.65355469 225.41476562 -68.30710938 224.82953125 -68.98046875 224.2265625 C-85.24442483 208.93198129 -94.06539306 185.24430633 -95.1875 163.33984375 C-95.61553434 137.47051805 -87.61211325 115.66920354 -71 96 C-51.41747554 72.2561891 -35.27121314 46.62864124 -20.52734375 19.65625 C-19.65988525 18.08447998 -19.65988525 18.08447998 -18.77490234 16.48095703 C-17.65604011 14.45156362 -16.5477967 12.41626954 -15.45166016 10.37451172 C-14.94296387 9.45428223 -14.43426758 8.53405273 -13.91015625 7.5859375 C-13.46808838 6.7717334 -13.02602051 5.9575293 -12.57055664 5.11865234 C-9.27460176 0.67246915 -5.40566393 -0.7722377 0 0 Z M-4 33 C-4.26925293 33.52505127 -4.53850586 34.05010254 -4.81591797 ${
                    filled ? `F` : ``
                }34.59106445 C-18.22306246 60.48983858 -34.69891057 85.84773325 -53.875 107.875 C-68.82392955 125.10528145 -75.5460311 144.38272194 -74 167 C-72.23788372 181.94594994 -66.26469135 195.97723763 -56 207 C-55.44699219 207.63164062 -54.89398438 208.26328125 -54.32421875 208.9140625 C-42.88937849 221.30408035 -25.13887664 228.3453623 -8.515625 229.3203125 C11.45503689 230.02684103 29.24880611 224.6034941 44.5390625 211.30859375 C58.44871687 198.26001322 66.94224624 181.64088352 68.23828125 162.4765625 C68.64106428 141.57424292 61.85379842 123.88988081 47.91796875 108.328125 C42.49616573 102.25162057 37.7885838 95.57755553 33 89 C32.5035498 88.31921387 32.00709961 87.63842773 31.49560547 86.93701172 C18.99041683 69.70827412 8.02501344 51.77449627 -2 33 C-2.66 33 -3.32 33 -4 33 Z`}
                fill='#99f5d1'
                transform='translate(512, 55) rotate(60)'
            />
            <path
                d={`M0 0 C4.71376575 2.63568723 7.01173035 5.02216188 9.4453125 9.8125 C10.04102051 10.96049072 10.63672852 12.10848145 11.25048828 13.29125977 C11.70878021 14.19873459 11.70878021 14.19873459 12.17633057 15.12454224 C13.79180297 18.31822609 15.4618282 21.48331768 17.125 24.65234375 C17.4556546 25.28534897 17.7863092 25.91835419 18.12698364 26.57054138 C30.42339181 50.03507409 45.70146287 72.25737461 62.625 92.625 C80.60804895 114.4265911 91.15075064 138.43333042 88.72265625 167.296875 C86.50811559 185.9411983 79.61481444 202.24666568 68 217 C67.48050781 217.68578125 66.96101562 218.3715625 66.42578125 219.078125 C52.34879068 236.52366496 30.22581847 246.74303048 8.37890625 249.6875 C-16.24023392 251.9644147 -42.49700091 246.12731963 -62.0625 230.4375 C-63.72706781 228.97944808 -65.37503825 227.50206548 -67 226 C-67.65355469 225.41476562 -68.30710938 224.82953125 -68.98046875 224.2265625 C-85.24442483 208.93198129 -94.06539306 185.24430633 -95.1875 163.33984375 C-95.61553434 137.47051805 -87.61211325 115.66920354 -71 96 C-51.41747554 72.2561891 -35.27121314 46.62864124 -20.52734375 19.65625 C-19.65988525 18.08447998 -19.65988525 18.08447998 -18.77490234 16.48095703 C-17.65604011 14.45156362 -16.5477967 12.41626954 -15.45166016 10.37451172 C-14.94296387 9.45428223 -14.43426758 8.53405273 -13.91015625 7.5859375 C-13.46808838 6.7717334 -13.02602051 5.9575293 -12.57055664 5.11865234 C-9.27460176 0.67246915 -5.40566393 -0.7722377 0 0 Z M-4 33 C-4.26925293 33.52505127 -4.53850586 34.05010254 -4.81591797 ${
                    filled ? `F` : ``
                }34.59106445 C-18.22306246 60.48983858 -34.69891057 85.84773325 -53.875 107.875 C-68.82392955 125.10528145 -75.5460311 144.38272194 -74 167 C-72.23788372 181.94594994 -66.26469135 195.97723763 -56 207 C-55.44699219 207.63164062 -54.89398438 208.26328125 -54.32421875 208.9140625 C-42.88937849 221.30408035 -25.13887664 228.3453623 -8.515625 229.3203125 C11.45503689 230.02684103 29.24880611 224.6034941 44.5390625 211.30859375 C58.44871687 198.26001322 66.94224624 181.64088352 68.23828125 162.4765625 C68.64106428 141.57424292 61.85379842 123.88988081 47.91796875 108.328125 C42.49616573 102.25162057 37.7885838 95.57755553 33 89 C32.5035498 88.31921387 32.00709961 87.63842773 31.49560547 86.93701172 C18.99041683 69.70827412 8.02501344 51.77449627 -2 33 C-2.66 33 -3.32 33 -4 33 Z`}
                fill='#93c5fd'
                transform='translate(256, 485) rotate(180)'
            />
            <path
                d={`M0 0 C4.71376575 2.63568723 7.01173035 5.02216188 9.4453125 9.8125 C10.04102051 10.96049072 10.63672852 12.10848145 11.25048828 13.29125977 C11.70878021 14.19873459 11.70878021 14.19873459 12.17633057 15.12454224 C13.79180297 18.31822609 15.4618282 21.48331768 17.125 24.65234375 C17.4556546 25.28534897 17.7863092 25.91835419 18.12698364 26.57054138 C30.42339181 50.03507409 45.70146287 72.25737461 62.625 92.625 C80.60804895 114.4265911 91.15075064 138.43333042 88.72265625 167.296875 C86.50811559 185.9411983 79.61481444 202.24666568 68 217 C67.48050781 217.68578125 66.96101562 218.3715625 66.42578125 219.078125 C52.34879068 236.52366496 30.22581847 246.74303048 8.37890625 249.6875 C-16.24023392 251.9644147 -42.49700091 246.12731963 -62.0625 230.4375 C-63.72706781 228.97944808 -65.37503825 227.50206548 -67 226 C-67.65355469 225.41476562 -68.30710938 224.82953125 -68.98046875 224.2265625 C-85.24442483 208.93198129 -94.06539306 185.24430633 -95.1875 163.33984375 C-95.61553434 137.47051805 -87.61211325 115.66920354 -71 96 C-51.41747554 72.2561891 -35.27121314 46.62864124 -20.52734375 19.65625 C-19.65988525 18.08447998 -19.65988525 18.08447998 -18.77490234 16.48095703 C-17.65604011 14.45156362 -16.5477967 12.41626954 -15.45166016 10.37451172 C-14.94296387 9.45428223 -14.43426758 8.53405273 -13.91015625 7.5859375 C-13.46808838 6.7717334 -13.02602051 5.9575293 -12.57055664 5.11865234 C-9.27460176 0.67246915 -5.40566393 -0.7722377 0 0 Z M-4 33 C-4.26925293 33.52505127 -4.53850586 34.05010254 -4.81591797 ${
                    filled ? `F` : ``
                }34.59106445 C-18.22306246 60.48983858 -34.69891057 85.84773325 -53.875 107.875 C-68.82392955 125.10528145 -75.5460311 144.38272194 -74 167 C-72.23788372 181.94594994 -66.26469135 195.97723763 -56 207 C-55.44699219 207.63164062 -54.89398438 208.26328125 -54.32421875 208.9140625 C-42.88937849 221.30408035 -25.13887664 228.3453623 -8.515625 229.3203125 C11.45503689 230.02684103 29.24880611 224.6034941 44.5390625 211.30859375 C58.44871687 198.26001322 66.94224624 181.64088352 68.23828125 162.4765625 C68.64106428 141.57424292 61.85379842 123.88988081 47.91796875 108.328125 C42.49616573 102.25162057 37.7885838 95.57755553 33 89 C32.5035498 88.31921387 32.00709961 87.63842773 31.49560547 86.93701172 C18.99041683 69.70827412 8.02501344 51.77449627 -2 33 C-2.66 33 -3.32 33 -4 33 Z`}
                fill='#f7ebc0'
                transform='translate(6, 50) rotate(-60)'
            />
        </svg>
    );
};

export default Logo;
