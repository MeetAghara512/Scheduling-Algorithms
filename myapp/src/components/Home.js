import React, { useContext } from 'react';
import Input from './Input';
import MultipleSelect from './MultipleSelect';
import { AppContext } from '../context/AppContext';

function Home() {
      const { type  } = useContext(AppContext);
      return (
            <>
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