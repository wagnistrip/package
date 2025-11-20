import React from 'react';
import { MuiOtpInput } from 'mui-one-time-password-input';
import {  Box } from '@mui/material';

const Test = () => {
  const [otp, setOtp] = React.useState('');
  
  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        justifyContent: 'center',
      }}
    >
      <p className='text-sm text-start font-semibold text-[#0e0e0e] text-opacity-70 mb-2'>
        Enter OTP sent to the email 
        <span className='font-bold text-[#0e0e0e] text-opacity-90'>
          gupta@gmail.com
        </span>
      </p>
      <MuiOtpInput
        value={otp}
        onChange={handleChange}
        length={6}
        inputStyle={{
          padding: 0,
          width: '40px', 
          height: '40px', 
          fontSize: '16px', 
          margin: '0', 
        }}
        inputProps={{
          style: {
            textAlign: 'center', 
          },
        }}
      />
    </Box>
  );
};

export default Test;
