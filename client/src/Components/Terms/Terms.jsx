import { useState } from 'react';
import { Typography, Card, CardHeader, CardBody, CardFooter } from '@material-tailwind/react';
import {  message } from 'antd';
import { motion } from 'framer-motion';

const TermsAndConditions = () => {
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleAcceptTerms = () => {
    setTermsAccepted(true);
    message.success('Terms and conditions accepted');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full px-4 md:px-6 lg:max-w-7xl lg:mx-auto py-12"
    >
      <Card className="w-full">
        <CardHeader className=" py-6 px-8 text-center">
          <Typography variant="h3" className="font-bold">
            Terms and Conditions
          </Typography>
        </CardHeader>
        <CardBody className="px-8 py-6">
          <div className="space-y-6">
            <div>
              <Typography variant="h5" className="font-bold">
                Advance reservation and Guarantee
              </Typography>
              <p className="text-gray-600 mt-2">
                All the reservation should be made through your Company by e mail or online request with the Hotel, after that the Hotel will confirm the reservation subject to availability.
              </p>
            </div>

            <div>
              <Typography variant="h5" className="font-bold">
                Terms & Conditions
              </Typography>
              <ul className="list-disc pl-6 text-gray-600 mt-2">
                <li>Group reservation should be made at least 5 to 10 days before by written request to the Hotel.</li>
                <li>
                  Payments shall be settled by Cash / Credit Card by guests during the time of check-out. In Case of Company payment, will be made through Cheque / Bank Transfer in favour of &quot;Safa Residency Hospitality & Tour Services&quot;.
                </li>
                <li>Payment confirmation to be made by Cheque of the Corporate Company shall inform the Hotel during reservation.</li>
                <li>For long staying guest, payment to be made in every end of the end.</li>
              </ul>
            </div>

            <div>
              <Typography variant="h5" className="font-bold">
                No Show
              </Typography>
              <p className="text-gray-600 mt-2">
                In the eventually that a guest with a confirmed reservation does not arrive at the date specified, &quot;NO SHOW&quot; charges will be automatically charged to the guests&apos; master account (Company), towards retention of ONE NIGHT.
              </p>
            </div>

            <div>
              <Typography variant="h5" className="font-bold">
                Cancellation policy for Group Booking
              </Typography>
              <p className="text-gray-600 mt-2">
                Cancellation should be 24 hours prior to arrival otherwise 50% room charge of One Night will be posted on your account billing for each of the reserved rooms. Cancellation at 02 (two) days prior to arrival will attract 100% charge of the FIRST NIGHT for each of the reserved rooms.
              </p>
            </div>
          </div>
        </CardBody>
        <CardFooter className="px-8 py-6 flex justify-between items-center">
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="terms-checkbox"
              className="mt-1"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <label htmlFor="terms-checkbox" className="text-sm text-gray-600">
              I agree to the terms and conditions
            </label>
          </div>
          <button
            onClick={handleAcceptTerms}
            disabled={!termsAccepted}
            className={`bg-gold text-white px-6 py-3 rounded-lg transition-colors ${
              termsAccepted
                ? 'hover:bg-opacity-90'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Accept Terms
          </button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default TermsAndConditions;