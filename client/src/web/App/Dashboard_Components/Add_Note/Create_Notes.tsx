import React from 'react'
import { useState, useContext } from 'react'
import { UserContext, UserContextType } from '../../../../App'
import { TextField, Box, Container, ThemeProvider, createTheme, Button, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import Send from '@mui/icons-material/Send';

export const CREATE_NOTES:React.FC = () => {

  const { currentUserData } = useContext<UserContextType>(UserContext)

  const [title, setTitle] = useState('')
  const [course, setCourse] = useState('')
  const [view, setView] = useState('public')
  const [university, setUniversity] = useState('')
  const [file, setFile] = useState('')
  const [fileData, setFileData] = useState<string | null>(null)

  const handleSubmit = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    
    const date = `${year}-${month}-${day}`
    const creator = currentUserData.Username

    console.log(creator, date)
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    let selectedFileTemp = e.target.files;
    if (selectedFileTemp) {
      let selectedFile = selectedFileTemp[0];
      if (selectedFile) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = (e) => {
          let target = e.target;
          if (target !== null) {
            const dataUrl = target.result as string;
            setFileData(dataUrl);
            const fileUrl = URL.createObjectURL(selectedFile);
            setFile(fileUrl);
          }
        };
      } else {
        setFileData(null);
        setFile('');
      }
    }
  };
  

  const theme = createTheme({
    typography: {
      fontFamily: ['Rubik', 'sans-serif'].join(','),
      fontSize: 16, 
    },
    components: {
      MuiInputLabel: {
        styleOverrides: {
          root: {
            fontFamily: ['Rubik', 'sans-serif'].join(','),
            fontSize: 16,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            fontFamily: ['Rubik', 'sans-serif'].join(','),
            fontSize: 16,
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontSize: 16,
          }
        }
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontSize: 16
          }
        }
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container style={{ height: "100%", width: "100%", display: "flex", padding: "0 0 0 0", justifyContent: "center", margin: "0 0 0 0" }}>
        <Box
          height="calc(100% - 10vh)"
          sx={{
            width: 300,
            backgroundColor: 'transparent',
            paddingTop: '2vh',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            marginLeft: '50px'
          }}
        >
          <h1 style={{
            fontSize: "70px",
            width: '100%',
            textAlign: 'center',
            marginBottom: '20px',
          }}>Add Note</h1>

          <TextField 
            label="Title" 
            size="small" 
            required  
            sx={{
              width: '100%',
            }}
            inputProps={{ style: { fontSize: '16px' } }}
            onChange={(e) => { setTitle(e.target.value) }}
          />

          <TextField 
            label="University" 
            size="small" 
            required 
            sx={{
              marginTop: '20px',
              width: '100%',
            }}          
            inputProps={{ style: { fontSize: '16px' } }}
            onChange={(e) => { setUniversity(e.target.value) }}
          />

          <TextField 
            label="Course Number" 
            size="small" 
            required 
            sx={{
              marginTop: '20px',
              width: '100%',
            }}            
            inputProps={{ style: { fontSize: '16px' } }}
            onChange={(e) => { setCourse(e.target.value) }}
          />

          <FormControl sx={{ minWidth: 10, width: 212.5, marginTop: "20px", marginBottom: "10px" }} size="small">
            <InputLabel id="demo-select-small-label">View</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={view}
              label="View *"
              required
              sx={{
                typography: {
                  fontSize: 16
                },
                width: '100%',
              }}
              onChange={(e) => { setView(e.target.value) }}
            >
              <MenuItem value={'public'}>Public</MenuItem>
              <MenuItem value={'private'}>Private</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            component="label"
            sx={{
              marginTop: 1,
              width: '100%',
            }}
          >
            Upload .PDF File
            <input
              type="file"
              hidden
              onChange={ handleFile }
            />
          </Button>

          <Button 
            variant="contained" 
            sx={{             
              marginTop: 2,
              width: '100%',
            }}
            size='small'
            endIcon={<Send />}
            onClick={ handleSubmit }
          >
            Submit
          </Button>
        </Box>
        <embed src={file} type="application/pdf" style={{ 
          height: "100%",
          width: "55vw",
          marginLeft: '50px'
        }}/>
      </Container>
    </ThemeProvider>
  )
}

