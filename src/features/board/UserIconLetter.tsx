import {
  Typography,
  Box,
} from '@mui/material';

function IconLetter 
({ 
    initial,
    backgroundcolor,
    normal = false
}: { 
    backgroundcolor: string | undefined
    initial: string | undefined,
    normal?: boolean
}) {
    return (
        <Box
        sx={{
           
            backgroundColor: backgroundcolor, 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '50%',
            
            ...(normal
              ? {
                width: 24,
                height: 24,
              }
              : {
                width: 20,
                height: 20,
            })
         }}
    
        >
        <Typography variant="body2">{initial}</Typography>
    </Box>
    )
}

export default IconLetter;