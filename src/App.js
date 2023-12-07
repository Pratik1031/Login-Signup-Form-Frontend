import Login from './pages/loginForm';

function App() {
  return (
    <>
      <div className='flex justify-center relative items-center h-screen bg-[#Fff]'>
        <img
          src='./Vector.png'
          className='absolute top-0 bottom-0 left-0 opacity-50'
        />
        <div className='flex flex-row max-w-[978px] w-[100vw] h-[580px] justify-center items-center bg-slate-50 rounded-3xl'>
          <div className='hidden md:block'>
            <img
              src='./bg1.png'
              className='bg-cover max-w-[500px] w-[480px] h-[580px] items-start'
            />
          </div>
          <div className='mx-auto px-[3rem] mb-6'>
            <Login />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
