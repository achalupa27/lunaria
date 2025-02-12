import CompanyLogo from '@/components/website/company-logo';
import { X_LINK, INSTAGRAM_LINK, YOUTUBE_LINK, TIKTOK_LINK, FACEBOOK_LINK, REDDIT_LINK, LINKEDIN_LINK, DISCORD_LINK, COMPANY_NAME } from '@/constants';
import Link from 'next/link';
import Instagram from '@/components/icons/socials/instagram';
import X from '@/components/icons/socials/x';
import Youtube from '@/components/icons/socials/youtube';
import TikTok from '@/components/icons/socials/tiktok';
import Facebook from '@/components/icons/socials/facebook';
import Reddit from '@/components/icons/socials/reddit';
import LinkedIn from '@/components/icons/socials/linkedin';
import Discord from '@/components/icons/socials/discord';
import Logo from '@/components/icons/logo';

const BrandInfo = () => {
    return (
        <div className='flex flex-col w-full justify-center items-center'>
            <Link href='/' className='flex w-fit items-center space-x-2 hover:cursor-pointer'>
                <Logo filled={true} height={40} width={40} />
                <span className={`text-3xl font-normal`}>{COMPANY_NAME}</span>
            </Link>
            <div className='grid w-fit grid-cols-5 gap-x-4 gap-y-2 pl-3 pt-2'>
                {X_LINK && (
                    <Link href={X_LINK} target='_blank'>
                        <X />
                    </Link>
                )}
                {INSTAGRAM_LINK && (
                    <Link href={INSTAGRAM_LINK} target='_blank'>
                        <Instagram />
                    </Link>
                )}
                {YOUTUBE_LINK && (
                    <Link href={YOUTUBE_LINK} target='_blank'>
                        <Youtube />
                    </Link>
                )}
                {TIKTOK_LINK && (
                    <Link href={TIKTOK_LINK} target='_blank'>
                        <TikTok />
                    </Link>
                )}
                {FACEBOOK_LINK && (
                    <Link href={FACEBOOK_LINK} target='_blank'>
                        <Facebook />
                    </Link>
                )}
                {REDDIT_LINK && (
                    <Link href={REDDIT_LINK} target='_blank'>
                        <Reddit />
                    </Link>
                )}
                {LINKEDIN_LINK && (
                    <Link href={LINKEDIN_LINK} target='_blank'>
                        <LinkedIn />
                    </Link>
                )}
                {DISCORD_LINK && (
                    <Link href={DISCORD_LINK} target='_blank'>
                        <Discord />
                    </Link>
                )}
            </div>
        </div>
    );
};

export default BrandInfo;
