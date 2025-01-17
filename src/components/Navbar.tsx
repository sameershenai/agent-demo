import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Avatar,
  Box,
  Badge,
  Divider,
  styled
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GridViewIcon from '@mui/icons-material/GridView';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: theme.palette.background.paper,
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  display: 'flex',
  alignItems: 'center',
  border: '1px solid',
  borderColor: theme.palette.grey[300],
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  },
}));

const NavIconButton = styled(IconButton)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  color: theme.palette.text.secondary,
  gap: 1,
  borderRadius: 0,
  padding: theme.spacing(1, 2),
  '&:hover': {
    color: theme.palette.text.primary,
  },
  '& .MuiTypography-root': {
    fontSize: '0.7rem',
  },
}));

function Navbar() {
  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', height: 52, px: { xs: 1, sm: 2, md: 4 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton size="large" edge="start" color="primary" sx={{ mr: 1 }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" width="24" height="24">
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
            </svg>
          </IconButton>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <NavIconButton>
            <HomeIcon />
            <Box sx={{ fontSize: '12px' }}>Home</Box>
          </NavIconButton>
          <NavIconButton>
            <PeopleIcon />
            <Box sx={{ fontSize: '12px' }}>Network</Box>
          </NavIconButton>
          <NavIconButton>
            <WorkIcon />
            <Box sx={{ fontSize: '12px' }}>Jobs</Box>
          </NavIconButton>
          <NavIconButton>
            <Badge badgeContent={3} color="error">
              <MessageIcon />
            </Badge>
            <Box sx={{ fontSize: '12px' }}>Messaging</Box>
          </NavIconButton>
          <NavIconButton>
            <Badge badgeContent={5} color="error">
              <NotificationsIcon />
            </Badge>
            <Box sx={{ fontSize: '12px' }}>Notifications</Box>
          </NavIconButton>
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
          <NavIconButton>
            <Avatar sx={{ width: 24, height: 24 }} />
            <Box sx={{ fontSize: '12px' }}>Me</Box>
          </NavIconButton>
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
          <NavIconButton>
            <GridViewIcon />
            <Box sx={{ fontSize: '12px' }}>For Business</Box>
          </NavIconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;