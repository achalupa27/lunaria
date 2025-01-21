import CompanyLogo from '@/components/company-logo';
import { X_LINK, INSTAGRAM_LINK, YOUTUBE_LINK, TIKTOK_LINK, FACEBOOK_LINK, REDDIT_LINK, LINKEDIN_LINK, DISCORD_LINK, COMPANY_NAME } from '@/constants';
import Link from 'next/link';
import Instagram from '@/components/icons/instagram';
import X from '@/components/icons/x';
import Youtube from '@/components/icons/youtube';
import TikTok from '@/components/icons/tiktok';
import Facebook from '@/components/icons/facebook';
import Reddit from '@/components/icons/reddit';
import LinkedIn from '@/components/icons/linkedin';
import Discord from '@/components/icons/discord';

const BrandInfo = () => {
    return (
        <div className='flex flex-col'>
            <div className='mr-16 flex lg:mr-24'>
                <CompanyLogo />
            </div>
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
            <div className='pl-3 pt-12 text-sm'>
                &copy; {new Date().getFullYear()} {COMPANY_NAME}
            </div>
        </div>
    );
};

export default BrandInfo;
