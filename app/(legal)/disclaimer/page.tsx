import Head from 'next/head';
import Link from 'next/link';

function Disclaimer() {
    return (
        <div className='flex min-h-screen justify-center'>
            <Head>
                <title>lunaria - Disclaimer</title>
            </Head>
            <div className='max-w-2xl'>
                <h1 className='flex w-full justify-center py-8'>Disclaimer</h1>
                <p>Last updated: November 19, 2022</p>
                <br></br>
                <h2 className='flex w-full justify-center py-6'>Interpretation</h2>
                <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
                <br></br>
                <h2 className='flex w-full justify-center py-6'>Definitions</h2>
                <p>For the purposes of this Disclaimer:</p>
                <ul>
                    <li>
                        <strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Disclaimer) refers to lunaria.
                    </li>
                    <li>
                        <strong>Service</strong> refers to the Website.
                    </li>
                    <li>
                        <strong>You</strong> means the individual accessing the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.
                    </li>
                    <li>
                        <strong>Website</strong> refers to lunaria, accessible from
                        <a href='https://www.lunaria.vercel.app' rel='external nofollow noopener' target='_blank'>
                            https://www.lunaria.vercel.app
                        </a>
                    </li>
                </ul>
                <br></br>
                <h2 className='flex w-full justify-center py-6'>Disclaimer</h2>
                <p>The information contained on the Service is for general information purposes only.</p>
                <p>The Company assumes no responsibility for errors or omissions in the contents of the Service.</p>
                <p>
                    In no event shall the Company be liable for any special, direct, indirect, consequential, or incidental damages or any damages whatsoever, whether in an action of contract, negligence or other tort, arising out of or in connection with the use of the Service or the contents of the Service. The Company reserves the right to make additions, deletions, or modifications to the contents on the Service
                    at any time without prior notice. This Disclaimer has been created with the help of the{' '}
                    <a href='https://www.termsfeed.com/disclaimer-generator/' target='_blank'>
                        TermsFeed Disclaimer Generator
                    </a>
                    .
                </p>
                <p>The Company does not warrant that the Service is free of viruses or other harmful components.</p>
                <br></br>
                <h2 className='flex w-full justify-center py-6'>External Links Disclaimer</h2>
                <p>The Service may contain links to external websites that are not provided or maintained by or in any way affiliated with the Company.</p>
                <p>Please note that the Company does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.</p>
                <br></br>
                <h2 className='flex w-full justify-center py-6'>Errors and Omissions Disclaimer</h2>
                <p>The information given by the Service is for general guidance on matters of interest only. Even if the Company takes every precaution to insure that the content of the Service is both current and accurate, errors can occur. Plus, given the changing nature of laws, rules and regulations, there may be delays, omissions or inaccuracies in the information contained on the Service.</p>
                <p>The Company is not responsible for any errors or omissions, or for the results obtained from the use of this information.</p>
                <br></br>
                <h2 className='flex w-full justify-center py-6'>Fair Use Disclaimer</h2>
                <p>The Company may use copyrighted material which has not always been specifically authorized by the copyright owner. The Company is making such material available for criticism, comment, news reporting, teaching, scholarship, or research.</p>
                <p>The Company believes this constitutes a &quot;fair use&quot; of any such copyrighted material as provided for in section 107 of the United States Copyright law.</p>
                <p>If You wish to use copyrighted material from the Service for your own purposes that go beyond fair use, You must obtain permission from the copyright owner.</p>
                <br></br>
                <h2 className='flex w-full justify-center py-6'>Views Expressed Disclaimer</h2>
                <p>The Service may contain views and opinions which are those of the authors and do not necessarily reflect the official policy or position of any other author, agency, organization, employer or company, including the Company.</p>
                <p>Comments published by users are their sole responsibility and the users will take full responsibility, liability and blame for any libel or litigation that results from something written in or as a direct result of something written in a comment. The Company is not liable for any comment published by users and reserves the right to delete any comment for any reason whatsoever.</p>
                <br></br>
                <h2 className='flex w-full justify-center py-6'>No Responsibility Disclaimer</h2>
                <p>The information on the Service is provided with the understanding that the Company is not herein engaged in rendering legal, accounting, tax, or other professional advice and services. As such, it should not be used as a substitute for consultation with professional accounting, tax, legal or other competent advisers.</p>
                <p>In no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever arising out of or in connection with your access or use or inability to access or use the Service.</p>
                <br></br>
                <h2 className='flex w-full justify-center py-6'>&quot;Use at Your Own Risk&quot; Disclaimer</h2>
                <p>All information in the Service is provided &quot;as is&quot;, with no guarantee of completeness, accuracy, timeliness or of the results obtained from the use of this information, and without warranty of any kind, express or implied, including, but not limited to warranties of performance, merchantability and fitness for a particular purpose.</p>
                <p>The Company will not be liable to You or anyone else for any decision made or action taken in reliance on the information given by the Service or for any consequential, special or similar damages, even if advised of the possibility of such damages.</p>
                <br></br>
                <h2 className='flex w-full justify-center pt-6 pb-2'>Contact Us</h2>
                <p className='text-center'>If you have any questions about this Terms of Use, You can contact us:</p>
                <div className='flex w-full justify-center'>
                    <Link href='/contact' className='button-secondary mb-12 mt-4 w-fit space-x-2'>
                        <i className='fi fi-rr-envelope'></i>
                        <span>Contact Us</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Disclaimer;
