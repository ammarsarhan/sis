import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import Header from '#/components/auth/Header'
import { Field, FieldLabel, FieldSet } from '#/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '#/components/ui/input-group'
import { Button } from '#/components/ui/button'
import { Separator } from '#/components/ui/separator'

import { ArrowRight, EyeIcon } from 'lucide-react'

export const Route = createFileRoute('/auth/reset-password')({
    component: ResetPassword,
})

type StrengthLabel = "Weak" | "Moderate" | "Strong";

function ResetPassword() {
    const [password, setPassword] = useState("");
    const [strength, setStrength] = useState<StrengthLabel>("Weak");

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);

        let score = 0;
        let current: StrengthLabel = "Weak";

        if (value.length >= 8) score++;
        if (/[a-z]/.test(value)) score++;
        if (/[A-Z]/.test(value)) score++;
        if (/[0-9]/.test(value)) score++;
        if (/[^A-Za-z0-9]/.test(value)) score++;

        if (score <= 2) current = "Weak";
        if (score <= 4) current = "Moderate";
        current = "Strong";

        setStrength(current);
    };

    return (
        <div className='flex flex-col w-screen h-screen'>
            <Header/>
            <main className='w-full h-full flex-center relative'>
                <FieldSet className='w-sm rounded-md overflow-clip shadow-sm py-6'>
                    <div className='px-6'>
                        <div className='flex flex-col gap-y-0.5 text-center'>
                            <h1 className='text-xl font-semibold'>Create New Password</h1>
                            <p className='text-xxs text-gray-500'>Please enter your new credentials to secure your account.</p>
                        </div>
                    </div>
                    <Separator className='w-full bg-gray-200'/>
                    <Field className="px-6">
                        <FieldLabel htmlFor="password" className='font-normal text-sm'>New Password</FieldLabel>
                        <InputGroup className='border-gray-200 focus-within:border-gray-400 focus-within:ring-gray-200'>
                            <InputGroupInput type="text" placeholder="Password" value={password} onChange={handleChangePassword}/>
                            <button>
                                <InputGroupAddon align="inline-end">
                                    <EyeIcon className='text-gray-500'/>
                                </InputGroupAddon>
                            </button>
                        </InputGroup>
                    </Field>
                    <div className="flex flex-col gap-y-1.5">
                        <div className='flex items-center justify-between px-6 text-sm'>
                            <span>Strength</span>
                            <span>{strength}</span>
                        </div>
                        <div className='my-1 px-6 w-full h-2 relative'>
                            <div className='absolute w-[calc(100%-3rem)] bg-gray-200 h-full rounded-full'></div>
                            <div className='absolute w-[calc(50%-1.5rem)] bg-red-600 h-full rounded-full'></div>
                        </div>
                        <div className='relative w-full mb-2 text-xs text-gray-500'>
                            <span className='absolute left-6'>Weak</span>
                            <span className='absolute left-1/2 -translate-x-1/2'>Moderate</span>
                            <span className='absolute right-6'>Strong</span>
                        </div>
                    </div>
                    <Field className="px-6">
                        <FieldLabel className='font-normal text-sm'>Confirm Password</FieldLabel>
                        <InputGroup className='border-gray-200 focus-within:border-gray-400 focus-within:ring-gray-200'>
                            <InputGroupInput type="text" placeholder="Password"/>
                            <button>
                            <InputGroupAddon align="inline-end">
                                <EyeIcon className='text-gray-500'/>
                            </InputGroupAddon>
                            </button>
                        </InputGroup>
                    </Field>
                    <Button className='bg-black hover:bg-black/80 cursor-pointer my-2 mx-6'>
                        <span className='text-white text-xxs font-normal'>Set Password</span>
                        <ArrowRight className='size-4 text-white'/>
                    </Button>
                </FieldSet>
                <span className='text-xs text-gray-500 absolute bottom-4'>© 2026 Egypt-Japan University of Science and Technology. All Rights Reserved.</span>
            </main>
        </div>
    )
}
