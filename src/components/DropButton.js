import React from 'react';
import { Menu, MenuItem, Button } from '@mui/material'; // Import from MUI Material
import { styled } from '@mui/system';
import { Fade } from '@mui/material'; // For animation

export default function MenuTransitions() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <StyledButton
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        My account
      </StyledButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade} // Use the Fade transition for animation
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Language settings</MenuItem>
        <MenuItem onClick={handleClose}>Log out</MenuItem>
      </Menu>
    </div>
  );
}

// Styled components for Button

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#4caf50',
  color: 'white',
  fontSize: '1rem',
  padding: '8px 16px',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: '#45a049',
  },
}));
