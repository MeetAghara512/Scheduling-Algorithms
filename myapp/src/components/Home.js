import React, { useContext } from 'react';
import Input from './Input';
import MultipleSelect from './MultipleSelect';
import { AppContext } from '../context/AppContext';
// import TableInput from './TableInput';

function Home() {
      const { type  } = useContext(AppContext);
      return (
            <>
                  {/* <div>Home Page</div> */}
                  <div className='OuterBox'>

                        <div className='multipleSelect'>
                              <MultipleSelect />
                        </div>
                        {type && (
                              <Input></Input>
                        )}
                  </div>
            </>
      );
}

export default Home;