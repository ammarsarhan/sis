import { createFileRoute, Link } from '@tanstack/react-router';
import { EyeIcon, Mail } from "lucide-react";

import { Field, FieldGroup, FieldLabel, FieldSet } from '#/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput } from '#/components/ui/input-group';
import { Checkbox } from '#/components/ui/checkbox';
import { Label } from '#/components/ui/label';
import { Button } from '#/components/ui/button';
import { Separator } from '#/components/ui/separator';

import logo from "#/assets/logo.png";

export const Route = createFileRoute('/auth/sign-in')({
  component: SignIn,
});

function SignIn() {
  return (
    <div className='relative flex-center w-screen h-screen'>
      <div className='flex-center flex-col gap-y-8'>
        <div className='flex-center flex-col gap-y-2'>
          <img src={logo} alt="E-JUST logo" className='object-fit w-12'/>
          <h1 className='text-center font-medium text-2xl'>E-JUST Postgraduate <br/> Student Information System</h1>
        </div>
        <FieldSet className='w-sm p-6 border border-gray-200 rounded-md'>
          <div className='flex flex-col'>
            <h2 className='text-lg font-medium'>Welcome Back!</h2>
            <p className='text-gray-400 text-sm'>Access your academic portal</p>
          </div>
          <FieldGroup className='gap-y-4'>
            <Field className='gap-y-2!'>
              <FieldLabel htmlFor="email" className='font-normal text-sm'>Email Address</FieldLabel>
              <InputGroup className='border-gray-200 focus-within:border-gray-400 focus-within:ring-gray-200'>
                <InputGroupAddon align="inline-start">
                  <Mail className='text-gray-500'/>
                </InputGroupAddon>
                <InputGroupInput type="text" placeholder="student@ejust.edu.eg"/>
              </InputGroup>
            </Field>
            <Field className='gap-y-2!'>
              <FieldLabel htmlFor="password" className='font-normal text-sm'>Password</FieldLabel>
              <InputGroup className='border-gray-200 focus-within:border-gray-400 focus-within:ring-gray-200'>
                <InputGroupInput type="text" placeholder="Password"/>
                <button>
                  <InputGroupAddon align="inline-end">
                    <EyeIcon className='text-gray-500'/>
                  </InputGroupAddon>
                </button>
              </InputGroup>
              <div className='flex items-center justify-between mt-1.5'>
                <div className='flex items-center gap-x-1.75'>
                  <Checkbox />
                  <Label className='text-xxs font-normal'>Remember me</Label>
                </div>
                <Link to="/auth/forgot-password" className='text-xxs text-nowrap hover:underline'>Forgot Password?</Link>
              </div>
            </Field>
            <Button className='bg-black hover:bg-black/80 cursor-pointer my-2'>
              <span className='text-white text-xxs font-normal'>Sign In</span>
            </Button>
            <div className='flex items-center gap-x-4 w-full'>
              <Separator className='flex-1 bg-gray-200'/>
              <span className='text-gray-500 text-xxs'>Or</span>
              <Separator className='flex-1 bg-gray-200'/>
            </div>
            <div className='flex-center gap-x-1'>
              <span className='text-xxs text-gray-500'>New Applicant?</span>
              <Link to="/" className='text-xxs hover:underline'>Apply Now</Link>
            </div>
          </FieldGroup>
        </FieldSet>
      </div>
      <span className='text-xs text-gray-500 absolute bottom-4'>© 2026 Egypt-Japan University of Science and Technology. All Rights Reserved.</span>
    </div>
  )
};
