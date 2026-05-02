import { createFileRoute } from '@tanstack/react-router'

import SettingsRow from '@/components/dashboard/settings/SettingsRow'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { MultiSelect } from '@/components/shared/MultiSelect'
import SettingsBlock from '@/components/dashboard/settings/SettingsBlock'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/dashboard/$cycleId/settings/')({
  component: RouteComponent,
})

const documentOptions = [
  { label: "Personal Photo", value: "PERSONAL_PHOTO" },
  { label: "Personal Photo", value: "PERSONAL_PHOTO" },
  { label: "Personal Photo", value: "PERSONAL_PHOTO" },
  { label: "Personal Photo", value: "PERSONAL_PHOTO" },
]

const documentFormats = [
  { label: ".jpeg", value: "JPEG" },
  { label: ".jpeg", value: "JPEG" },
  { label: ".jpeg", value: "JPEG" },
  { label: ".jpeg", value: "JPEG" },
]

function RouteComponent() {
  return (
    <main className='px-6 mb-8'>
      <SettingsBlock title="Intake Settings">
        <SettingsRow label={'Maximum Applications'} description={'The most amount of allowed submitted applications for this cycle intake.'}>
          <Input placeholder='10,000' className='w-80'/>
        </SettingsRow>
        <Separator />
        <SettingsRow label={'Target Revenue'} description={'The target revenue in EGP we want to achieve this cycle.'}>
          <Input placeholder='1,000,000' className='w-80'/>
        </SettingsRow>
        <Separator />
      </SettingsBlock>
      <SettingsBlock title="Payments">
        <SettingsRow label={'Online Fee'} description={'The set application fee in EGP for Egyptian students applying online.'}>
          <Input placeholder='1,000.00 EGP' className='w-80'/>
        </SettingsRow>
        <Separator />
        <SettingsRow label={'In-Person Fee'} description={'The set application fee in EGP for Egyptian students applying in-person.'}>
          <Input placeholder='1,000.00 EGP' className='w-80'/>
        </SettingsRow>
        <Separator />
        <SettingsRow label={'Foreign Fee'} description={'The set application fee in USD for international students applying.'}>
          <Input placeholder='175.00 USD' className='w-80'/>
        </SettingsRow>
        <Separator />
      </SettingsBlock>
      <SettingsBlock title="Document Settings">
        <SettingsRow label={'Required Documents'} description={'The documents an applicant needs to submit to finalize their application.'}>
          <MultiSelect className="w-80" options={documentOptions} placeholder='Select documents...'/>
        </SettingsRow>
        <Separator />
        <SettingsRow label={'Allowed Document Formats'} description={'Allowed document formats for an applicant to upload (ex: .pdf).'}>
          <MultiSelect className="w-80" options={documentFormats} placeholder='Select formats...'/>
        </SettingsRow>
        <Separator />
        <SettingsRow label={'Maximum File Size'} description={'The largest file size allowed for an applicant to upload.'}>
          <Input placeholder='5 MB' className='w-80'/>
        </SettingsRow>
        <Separator />
      </SettingsBlock>
      <Button className='font-normal float-right mt-2 px-4'>
        Save changes
      </Button>
    </main>
  )
}
