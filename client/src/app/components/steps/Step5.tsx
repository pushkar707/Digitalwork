import { Button } from '@mui/material';
import React from 'react'

const Step5 = () => {    
    return (
        <>
            <p className='text-xl font-semibold'>License Test</p>
            <div className="ml-2 mt-6">
                <p>Please Refer to following pdf for test preparation:&nbsp; 
                    <a target='_blank' className='text-blue-400' href="https://transport.delhi.gov.in/sites/default/files/generic_multiple_files/qbankltest.pdf">Question Bank</a>
                </p>

                <p className='text-xl font-medium my-4'>Rules: </p>
                <div className="ml-5 lg:ml-6">
                    <ul className='list-disc flex flex-col gap-y-2 opacity-85' >
                        <li>You get 30 seconds to attempt one question</li>
                        <li>You can not change your answer once you move to next question</li>
                        <li>You need to answer 8/15 questions to pass the test</li>
                        <li>If you try to switch your tab or minimize browser window, you will be skipped to next question</li>
                    </ul>
                </div>

                <div className='flex items-center gap-x-3 mt-8 '>
                    <p className='font-medium'>Click the button to start your test: </p>
                    <a href="/license_test">
                         <Button variant="contained" color="primary" className='bg-blue-600 rounded-lg normal-case' size="medium">Start Test</Button>
                    </a>
                </div>
            </div>
        </>
    )
}

export default Step5