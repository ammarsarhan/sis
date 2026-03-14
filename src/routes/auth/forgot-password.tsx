import { createFileRoute, Link } from '@tanstack/react-router'

import { Field, FieldGroup, FieldLabel, FieldSet } from '#/components/ui/field';
import { Badge } from '#/components/ui/badge';
import Header from '#/components/auth/Header'

import campus from "#/assets/campus.jpg";
import { InputGroup, InputGroupAddon, InputGroupInput } from '#/components/ui/input-group';
import { ArrowLeft, Mail } from 'lucide-react';
import { Button } from '#/components/ui/button';
import { Separator } from '#/components/ui/separator';

export const Route = createFileRoute('/auth/forgot-password')({
  component: ForgotPassword,
})

function ForgotPassword() {
  return (
    <div className='flex flex-col w-screen h-screen'>
        <Header/>
        <main className='w-full h-full flex-center relative'>
            <FieldSet className='w-sm rounded-md overflow-clip shadow-sm'>
                <div className='relative h-52 overflow-clip'>
                    <img src={campus} className='w-full h-full object-cover'/>
                    <Badge className='absolute bottom-4 left-4 bg-white'>Secure Portal</Badge>
                </div>
                <div className='flex flex-col gap-y-0.5 px-4'>
                    <div className='mb-2.5 flex items-center gap-x-1.5'>
                        <ArrowLeft className='size-3 text-gray-500'/>
                        <Link to="/auth/sign-in" className='text-xxs hover:underline text-gray-500'>Back to sign in</Link>
                    </div>
                    <h1 className='text-xl font-semibold'>Reset Password</h1>
                    <p className='text-gray-500 text-xxs'>Enter the email associated with your account and we'll send you a link to reset your password.</p>
                </div>
                <FieldGroup className='gap-y-4 px-4'>
                    <Field className='gap-y-2!'>
                    <FieldLabel htmlFor="email" className='font-normal text-sm'>Email Address</FieldLabel>
                    <InputGroup className='border-gray-200 focus-within:border-gray-400 focus-within:ring-gray-200'>
                        <InputGroupAddon align="inline-start">
                            <Mail className='text-gray-500'/>
                        </InputGroupAddon>
                        <InputGroupInput type="text" placeholder="student@ejust.edu.eg"/>
                    </InputGroup>
                    </Field>
                </FieldGroup>
                <Button className='bg-black hover:bg-black/80 cursor-pointer mx-4'>
                    <span className='text-white text-xxs font-normal'>Send Reset Link</span>
                </Button>
                <div className='w-full px-4'>
                    <Separator className='w-full bg-gray-200'/>
                </div>
                <p className='text-xxs text-gray-500 w-full text-center mx-4 mb-4'>If you still have any problems, please contact <a href="mailto://support@ejust.edu.eg" className='text-black hover:underline'>support@ejust.edu.eg</a></p>
            </FieldSet>
            <span className='text-xs text-gray-500 absolute bottom-4'>© 2026 Egypt-Japan University of Science and Technology. All Rights Reserved.</span>
        </main>
    </div>
  )
}
