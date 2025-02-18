import Link from 'next/link';

const TermsOfUse = () => {
    return (
        <article className='max-w-5xl mx-auto leading-relaxed space-y-10'>
            <section className='border-b pb-6 pt-20'>
                <h2 className='mb-2 text-center'>Terms of Use</h2>
                <p className='text-sm text-zinc-700 dark:text-zinc-300 text-center'>Effective Date: February 12, 2025</p>
                <p className='mt-4'>Welcome to Lunaria. Please read these Terms of Use (&quot;Terms&quot;) carefully before using the Lunaria personal finance SaaS platform (&quot;Service&quot;). By accessing or using the Service, you agree to be bound by these Terms, our Privacy Policy, and any additional policies referenced herein. If you do not agree with these Terms, do not use the Service.</p>
            </section>

            <section>
                <h3 className='mb-2'>Acceptance and User Eligibility</h3>
                <p className='mb-2'>By accessing or using our Service, you (&quot;User&quot;, &quot;you&quot;, or &quot;your&quot;) agree to these Terms and our Privacy Policy. If you are using the Service on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these Terms.</p>
                <p>You must be at least 18 years of age (or the legal age of majority in your jurisdiction) to use this Service. If you do not meet this requirement, you must not access or use the Service.</p>
            </section>

            <section>
                <h3 className='mb-2'>License Grant and Access</h3>
                <p className='mb-2'>Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, and revocable license to access and use the Service solely for your personal finance management and internal business purposes.</p>
                <p>You agree not to reverse engineer, decompile, disassemble, or otherwise attempt to derive the source code of the Service. You further agree not to resell, lease, sublicense, or distribute access to the Service. You also agree not to copy or mirror any part of the Service.</p>
            </section>

            <section>
                <h3 className='mb-2'>Acceptable Use</h3>
                <p className='mb-2'>To keep our community safe and friendly, we ask that you don&apos;t use the service for any unlawful purposes, including:</p>
                <ul className='list-disc list-inside my-2'>
                    <li>Harassment or abuse of other users</li>
                    <li>Distribution of malware or malicious content</li>
                    <li>Unauthorized access to other accounts</li>
                    <li>Spam or unsolicited promotional content</li>
                </ul>
            </section>

            {/* User & Data */}

            <section>
                <h3 className='mb-2'>Intellectual Property</h3>
                <p className='mb-2'>All software, content, technology, and materials provided as part of the Service are the exclusive property of Lunaria or its licensors. No ownership rights are transferred to you under these Terms.</p>
                <p>You may not modify, reproduce, distribute, or create derivative works of any part of the Service without our express written consent.</p>
                <p>All intellectual property rights in the service and its content belong to us or our licensors. This includes but is not limited to software, designs, logos, and documentation.</p>
                <p>Any feedback, comments, or suggestions you provide regarding the service may be used by us without any obligation to compensate you.</p>
            </section>

            <section>
                <h3 className='mb-2'>Feedback to Lunaria</h3>
                <p className='mb-2'>We welcome your feedback, suggestions, or ideas (&quot;Feedback&quot;) regarding the Service. By submitting any Feedback, you grant Lunaria a perpetual, irrevocable, non-exclusive, worldwide, royalty-free license to use, modify, reproduce, distribute, and otherwise exploit the Feedback for any purpose, without any obligation to you.</p>
                <p>You acknowledge that any Feedback provided is non-confidential and may be used by Lunaria in its business operations.</p>
            </section>

            <section>
                <h3 className='mb-2'>User Content</h3>
                <p className='mb-2'>&quot;User Content&quot; means any text, images, videos, data, or other materials that you submit, post, upload, or otherwise provide through our Service.</p>
                <p className='mb-2'>By submitting User Content, you grant Lunaria a worldwide, non-exclusive, royalty-free, irrevocable license to use, reproduce, modify, distribute, publicly display, and create derivative works of such content solely for the purposes of operating, promoting, and improving the Service.</p>
                <p className='mb-2'>You represent and warrant that you own or have all necessary rights and permissions to submit the User Content and to grant the above license, and that your User Content does not infringe on the intellectual property rights or other rights of any third party.</p>
                <p className='mb-2'>You are solely responsible for the User Content you provide. Lunaria is not responsible for any loss, damage, or liability arising from or relating to your User Content.</p>
                <p>Lunaria reserves the right, at its sole discretion, to review, moderate, and remove any User Content that violates these Terms or is deemed harmful, offensive, or inappropriate, without prior notice.</p>
            </section>

            <section>
                <h3 className='mb-2'>Attribution</h3>
                <p className='mb-2'>
                    Certain content provided on the Service may require attribution to its original sources. All third-party materials, data, or media used within the Service are credited where appropriate. If you wish to reuse or reference any content from Lunaria or any third-party content provided through the Service, you must include proper attribution as specified by the original content owner.
                </p>
            </section>

            <section>
                <h3 className='mb-2'>Data Privacy and Security</h3>
                <p className='mb-2'>
                    Our{' '}
                    <Link href='/privacy' className='hover:underline'>
                        Privacy Policy
                    </Link>{' '}
                    (which is incorporated herein by reference) explains how we collect, use, store, and protect your personal and financial information. By using the Service, you consent to our data practices as described in our Privacy Policy.
                </p>
                <p className='mb-2'>We employ industry-standard security measures—including encryption, multi-factor authentication, access control and authentication measures, and regular security audits—to safeguard your data. However, no method of electronic transmission or storage is 100% secure.</p>
                <p>In order to comply with global data protection laws such as the GDPR, CCPA, and others, we ensure that any cross-border data transfers are governed by appropriate mechanisms such as Standard Contractual Clauses.</p>
            </section>

            <section>
                <h3 className='mb-2'>Emails</h3>
                <p className='mb-2'>By providing your email address during registration or while using the Service, you consent to receive communications, updates, and promotional emails from Lunaria. You may opt-out of these emails at any time by following the unsubscribe instructions included in our emails or by contacting us directly.</p>
                <p>While we strive to ensure our email communications are secure and error-free, Lunaria is not responsible for any delays, errors, or inaccuracies in the delivery of emails.</p>
            </section>

            <section>
                <h3 className='mb-2'>Third Party Sites and Advertisers</h3>
                <p className='mb-2'>
                    The Service may include links to third-party websites and display content or advertisements provided by third-party advertisers. These links and advertisements are provided solely for your convenience, and Lunaria does not endorse, control, or assume any responsibility for the content, privacy practices, or terms of use of any third-party sites or advertisers. Lunaria does not verify the accuracy
                    of any third-party content or advertisements. Your interactions with such third parties are exclusively between you and the respective third party.
                </p>
            </section>

            <section>
                <h3 className='mb-2'>Payment, Fees, and Subscriptions</h3>
                <p className='mb-2'>Access to the Service may be provided on a subscription basis. By subscribing, you agree to pay all fees in accordance with the pricing plan selected and as set forth in your Order Form.</p>
                <p className='mb-2'>Fees are billed in advance and are non-refundable, except as expressly provided in these Terms. Auto-renewal provisions apply unless you cancel your subscription in accordance with our cancellation policy. You can cancel at any time through your account settings</p>
                <p>In the event of non-payment, we reserve the right to suspend or terminate your access to the Service.</p>
            </section>

            <section>
                <h3 className='mb-2'>Termination</h3>
                <p className='mb-2'>While we hope it never comes to this, we reserve the right to suspend or terminate accounts that violate these terms or harm our community.</p>
            </section>

            {/* Legal Stuff */}

            <section>
                <h3 className='mb-2'>Financial Disclaimers and Regulatory Compliance</h3>
                <p className='mb-2'>The Service is provided for informational purposes only and does not constitute financial, investment, legal, or tax advice. You should consult with a qualified professional before making any financial decisions.</p>
                <p className='mb-2'>You acknowledge that the use of our Service involves inherent risks, including potential data breaches or inaccuracies. We assume no liability for any losses or damages arising from your reliance on the Service.</p>
                <p>The Service complies with applicable laws and regulations—including anti-money laundering (AML), know-your-customer (KYC), and other financial regulatory requirements. You agree to use the Service in accordance with all applicable laws.</p>
                <p className='font-semibold mt-4'>Risk Warning</p>
                <p>Using financial management tools involves inherent risks. While we strive for accuracy, we cannot guarantee that our service will be error-free or meet your specific requirements. You should:</p>
                <ul className='list-disc list-inside my-2'>
                    <li>Verify all financial information independently</li>
                    <li>Consult with qualified financial professionals for personalized advice</li>
                    <li>Make your own decisions regarding your financial matters</li>
                </ul>
            </section>

            <section>
                <h3 className='mb-2'>Disclaimer of Warranties</h3>
                <p className='mb-2'>The Service is provided on an &quot;as is&quot; and &quot;as available&quot; basis without any representations or warranties, express or implied. Lunaria disclaims all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>
                <p className='mb-2'>We do not warrant that the Service will be uninterrupted, secure, error-free, or free from viruses or other harmful components. Your use of the Service is entirely at your own risk.</p>
                <p>In no event shall Lunaria be liable for any damages arising from your use or inability to use the Service.</p>
            </section>

            <section className='mb-8'>
                <h3 className='mb-2'>Limitation of Liability</h3>
                <p className='mb-2'>To the fullest extent permitted by law, our total liability for any claims arising out of or related to these Terms or your use of the Service shall not exceed the total fees paid by you during the twelve (12) months preceding the incident giving rise to the claim.</p>
                <p>In no event shall we be liable for any indirect, incidental, consequential, or punitive damages, including loss of profits or data.</p>
            </section>

            <section>
                <h3 className='mb-2'>Governing Law and Dispute Resolution</h3>
                <p className='mb-2'>
                    These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of laws principles. Any disputes arising out of these Terms or your use of the Service shall be resolved primarily through binding arbitration in [Your City/Region]. In jurisdictions where arbitration is not available, disputes will be resolved in the courts of [Your
                    Jurisdiction].
                </p>
                <p>You agree that any changes to these Terms will be communicated in accordance with the Modification section below.</p>

                <p className='font-semibold mt-4'>Dispute Process</p>
                <p>In the event of any dispute, you agree to:</p>
                <ul className='list-disc list-inside my-2'>
                    <li>First attempt to resolve it informally</li>
                    <li>If informal resolution fails, proceed to mediation</li>
                    <li>Use arbitration as a last resort</li>
                </ul>
            </section>

            <section>
                <h3 className='mb-2'>Severability</h3>
                <p>If any provision of this Agreement is unlawful, void, or unenforceable for any reason, then that provision will be severed and the remaining provisions will remain in full force and effect.</p>
            </section>

            <section>
                <h3 className='mb-2'>Waiver</h3>
                <p className='mb-2'>Except as provided herein, the failure to exercise a right or to require performance of an obligation under these Terms shall not effect a party&apos;s ability to exercise such right or require such performance at any time thereafter nor shall the waiver of a breach constitute a waiver of any subsequent breach.</p>
            </section>

            <section>
                <h3 className='mb-2'>Indemnification</h3>
                <p className='mb-2'>You agree to indemnify, defend, and hold harmless Lunaria, its affiliates, officers, directors, employees, and agents from and against any claims, damages, obligations, losses, liabilities, costs, or expenses (including reasonable attorneys&apos; fees) arising out of or in connection with:</p>
                <ul className='list-disc list-inside mb-2'>
                    <li>your use of the Service;</li>
                    <li>your breach of these Terms; and</li>
                    <li>your violation of any rights of another.</li>
                </ul>
                <p>This indemnification obligation shall survive the termination of these Terms.</p>
            </section>

            <section>
                <h3 className='mb-2'>United States Legal Compliance</h3>
                <p>You represent and warrant that (i) You are not located in a country that is subject to the United States government embargo, or that has been designated by the United States government as a &quot;terrorist supporting&quot; country, and (ii) You are not listed on any United States government list of prohibited or restricted parties.</p>
            </section>

            <section>
                <h3 className='mb-2'>Additional Provisions for Global Operations</h3>
                <p className='mb-2'>The Service is offered globally and is subject to local laws and regulations. In case of any conflict between these Terms and mandatory local consumer protection laws, the local laws will apply.</p>
                <p>These Terms are provided in English. In the event of any discrepancies in translation, the English version shall prevail.</p>
            </section>

            <section>
                <h3 className='mb-2'>Modifications to the Terms</h3>
                <p className='mb-2'>We reserve the right to modify these Terms at any time. Any material changes will be posted on our website and, where feasible, sent to you via email. Your continued use of the Service after the effective date of any changes constitutes your acceptance of the modified Terms.</p>
            </section>

            <section>
                <h3 className='mb-2'>Modifications to the Service</h3>
                <p className='mb-2'>We&apos;re constantly improving our service. This means we may modify or discontinue features at any time, though we&apos;ll always try to give you notice of significant changes.</p>
            </section>

            <section>
                <h3 className='mb-2'>Entire Agreement</h3>
                <p>These Terms, along with our Privacy Policy and any other policies referenced herein, constitute the entire agreement between you and Lunaria regarding your use of the Service, superseding all prior communications, agreements, or representations, whether oral or written.</p>
            </section>

            <section>
                <h3 className='mb-2'>Contact Information</h3>
                <p className='mb-2'>If you have any questions, concerns, or comments regarding these Terms, please contact us at:</p>
                <p className='font-mono'>lunariaspacefinance@gmail.com</p>
            </section>
        </article>
    );
};

export default TermsOfUse;
