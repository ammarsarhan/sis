import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Download, Printer, X } from 'lucide-react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute(
  '/dashboard/$cycleId/applications/$applicationId/',
)({
  component: RouteComponent,
})

const application = {
  id: 'app-1',
  code: 'APP-2025-0042',
  status: 'SUBMITTED' as const,
  channel: 'ONLINE' as const,
  curriculum: 'THANAWIYA_AMMA' as const,
  school: 'Cairo STEM School',
  grade: 96,
  createdAt: new Date('2025-02-14T10:30:00'),
  updatedAt: new Date('2025-02-15T08:00:00'),
  cycle: { name: 'Fall 2025' },
  faculty: { nameEn: 'Faculty of Engineering', code: 'ENG' },
  department: { nameEn: 'Computer Science & Engineering' },
}

const applicant = {
  nameEn: 'Omar Youssef Mahmoud',
  nameAr: 'عمر يوسف محمود',
  nationality: 'EG',
  nationalId: '30201150100123',
  passportNumber: 'A12345678',
  passportIssueDate: new Date('2020-05-10'),
  passportExpirationDate: new Date('2030-05-10'),
  phone: '+20 100 000 0001',
  dateOfBirth: new Date('2002-01-15'),
  gender: 'MALE' as const,
  streetEn: '14 Tahrir Square',
  cityEn: 'Cairo',
  governorateEn: 'Cairo',
  user: { email: 'omar.youssef@example.com' },
}

const guardians = [
  {
    id: 'g-1',
    name: 'Youssef Ahmed Mahmoud',
    phone: '+20 100 000 0099',
    relationship: 'FATHER' as const,
    occupation: 'Civil Engineer',
    description: 'Primary contact. Available weekdays 9AM – 5PM.',
    isPrimary: true,
  },
  {
    id: 'g-2',
    name: 'Hoda Ibrahim Saad',
    phone: '+20 100 000 0088',
    relationship: 'MOTHER' as const,
    occupation: 'School Teacher',
    description: null,
    isPrimary: false,
  },
];

const previousApplications = [
  {
    id: 'app-prev-1',
    code: 'APP-2024-0017',
    status: 'REJECTED' as const,
    cycle: { name: 'Spring 2024' },
    faculty: { nameEn: 'Faculty of Engineering' },
    department: { nameEn: 'Mechanical Engineering' },
    grade: 91,
    createdAt: new Date('2024-01-20'),
  },
  {
    id: 'app-prev-2',
    code: 'APP-2024-0103',
    status: 'ACCEPTED' as const,
    cycle: { name: 'Fall 2024' },
    faculty: { nameEn: 'Faculty of Science' },
    department: { nameEn: 'Physics' },
    grade: 94,
    createdAt: new Date('2024-08-05'),
  },
];

const documents = [
  { id: 'd-1', type: 'PERSONAL_PHOTO', fileName: 'photo.jpg', fileSize: 512000, format: 'JPEG', status: 'ACCEPTED' as const },
  { id: 'd-2', type: 'NATIONAL_ID', fileName: 'national_id_front.pdf', fileSize: 1048576, format: 'PDF', status: 'ACCEPTED' as const },
  { id: 'd-3', type: 'BIRTH_CERTIFICATE', fileName: 'birth_cert.pdf', fileSize: 2097152, format: 'PDF', status: 'UPLOADED' as const },
  { id: 'd-4', type: 'TRANSCRIPT', fileName: 'transcript_2025.pdf', fileSize: 3145728, format: 'PDF', status: 'REJECTED' as const, rejectionReason: 'Document is blurry and unreadable.' },
  { id: 'd-5', type: 'CERTIFICATE', fileName: 'certificate.pdf', fileSize: 1572864, format: 'PDF', status: 'UPLOADED' as const },
];

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / 1048576).toFixed(1)} MB`
}

function RouteComponent() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, []);

  const primaryGuardian = guardians.find(guardian => guardian.isPrimary)!;

  return (
    <>
      <div className={`sticky top-0 px-6 bg-white z-10 transition-all ${scrolled ? 'pt-6' : 'pt-4'}`}>
        <div className='mb-4 flex items-start justify-between'>
            <div className="flex flex-col gap-y-0.5">
                <h1 className="text-xl font-medium">View Application</h1>
                <p className="text-gray-500 text-sm">Review the applicant's full submission details and update the application status.</p>
            </div>
            <Link to="/dashboard/$cycleId/applications" params={{ cycleId: "cycle-id" }} search={{ status: undefined, page: 1, limit: 10 }} className='flex items-center gap-x-1.5 text-primary hover:underline'>
                <ArrowLeft className='size-3.5' />
                <span className='text-sm'>Back to applications</span>
            </Link>
        </div>
        <div className='flex items-center justify-between border-b pt-2 pb-4'>
            <div className='flex items-center gap-x-3'>
                <Button variant={"outline"}>
                    <ArrowLeft className='size-3.5' />
                    <span className='font-normal text-[0.8125rem]'>Previous</span>
                </Button>
                <Button variant={"outline"}>
                    <Download className='size-3.5' />
                    <span className='font-normal text-[0.8125rem]'>Download</span>
                </Button>
                <Button variant={"outline"}>
                    <Printer className="size-3.5"/>
                    <span className='font-normal text-[0.8125rem]'>Print</span>
                </Button>
                <Button variant={"outline"}>
                    <span className='font-normal text-[0.8125rem]'>Next</span>
                    <ArrowRight className="size-3.5"/>
                </Button>
            </div>
            <div className='flex items-center gap-x-3'>
                <Button>
                    <Check className='size-3.5'/>
                    <span className='font-normal text-[0.8125rem]'>Approve</span>
                </Button>
                <Button variant={"outline"}>
                    <X className="size-3.5"/>
                    <span className='font-normal text-[0.8125rem]'>Reject</span>
                </Button>
            </div>
        </div>
      </div>
      <main className='m-6 flex flex-col gap-y-6'>
        <section className='p-6 rounded-xl bg-muted'>
          <div className='flex items-center justify-between mb-4'>
            <h1 className='font-medium'>Applicant Information</h1>
            <Link to="/dashboard/applicants/$applicantId" params={{ applicantId: "applicant-id" }} className='flex items-center gap-x-1.5 text-primary hover:underline'>
              <span className='text-[0.8125rem]'>View profile</span>
              <ArrowRight className='size-3' />
            </Link>
          </div>
          <div className='grid grid-cols-3 gap-x-6 gap-y-4 text-[0.8125rem]'>
            {[
              { label: 'Full Name (English)', value: applicant.nameEn },
              { label: 'Full Name (Arabic)', value: applicant.nameAr },
              { label: 'Nationality', value: `Egyptian (${applicant.nationality})` },
              { label: 'Date of Birth', value: applicant.dateOfBirth.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) },
              { label: 'Gender', value: applicant.gender === 'MALE' ? 'Male' : 'Female' },
              { label: 'Email', value: applicant.user.email },
              { label: 'Phone', value: applicant.phone },
              { label: 'National ID', value: applicant.nationalId },
              { label: 'Passport Number', value: applicant.passportNumber },
              { label: 'Passport Issue Date', value: applicant.passportIssueDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) },
              { label: 'Passport Expiry Date', value: applicant.passportExpirationDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) },
              { label: 'Address', value: `${applicant.streetEn}, ${applicant.cityEn}, ${applicant.governorateEn}` },
            ].map(({ label, value }) => (
              <div key={label} className='flex flex-col gap-y-0.5'>
                <span className='text-gray-500 text-xs'>{label}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </section>
        <section className='p-6 rounded-xl bg-muted'>
          <div className="flex flex-col gap-y-0.5 mb-6">
            <h1 className="font-medium">Application Details</h1>
            <p className="text-gray-500 text-[0.8125rem]">An applicant may have multiple applications across cycles. Make sure that you are viewing the intended one.</p>
          </div>
          <div className='grid grid-cols-3 gap-x-6 gap-y-4 text-[0.8125rem] mb-8'>
            {[
              { label: 'Application Code', value: application.code },
              { label: 'Cycle', value: application.cycle.name },
              { label: 'Channel', value: application.channel === 'ONLINE' ? 'Online' : application.channel },
              { label: 'Faculty', value: application.faculty.nameEn },
              { label: 'Department', value: application.department.nameEn },
              { label: 'Curriculum', value: application.curriculum.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) },
              { label: 'School', value: application.school },
              { label: 'Grade', value: `${application.grade}%` },
              { label: 'Submitted At', value: application.createdAt.toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) },
            ].map(({ label, value }) => (
              <div key={label} className='flex flex-col gap-y-0.5'>
                <span className='text-gray-500 text-xs'>{label}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
          <div className='mb-1.5'>
            <h1 className='font-medium text-[0.95rem]'>Other Applications</h1>
          </div>
          <div className='grid grid-cols-3 gap-x-6 gap-y-4 text-[0.8125rem]'>
            {
              previousApplications.map((app, index) => {
                return (
                  <Link className="text-primary hover:underline" to={'/dashboard/$cycleId/applications/$applicationId'} params={{ cycleId: "cycle-id", applicationId: "application-id" }}>{index + 1}) Submitted on {app.createdAt.toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</Link>
                )
              })
            }
          </div>
        </section>
        <section className='p-6 rounded-xl bg-muted'> 
          <div className="flex flex-col gap-y-0.5 mb-6">
            <h1 className="font-medium">Guardian Details</h1>
            <p className="text-gray-500 text-[0.8125rem]">Emergency contacts and guardians associated with this applicant.</p>
          </div>
          <div className='flex flex-col gap-y-4'>
            <h2 className='text-sm font-medium'>Primary Contact</h2>
            <div className='grid grid-cols-3 gap-x-6 gap-y-4 text-[0.8125rem] mb-8'>
              {[
                { label: 'Name', value: primaryGuardian.name },
                { label: 'Phone', value: primaryGuardian.phone },
                { label: 'Relationship', value: `${primaryGuardian.relationship[0]}${primaryGuardian.relationship.slice(1).toLowerCase()}` },
                { label: 'Occupation', value: primaryGuardian.occupation },
                { label: 'Is Primary?', value: primaryGuardian.isPrimary ? "Yes" : "No" },
                { label: 'Additional Notes', value: primaryGuardian.description ? primaryGuardian.description : "None" },
              ].map(({ label, value }) => (
                <div key={label} className='flex flex-col gap-y-0.5'>
                  <span className='text-gray-500 text-xs'>{label}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className='flex flex-col gap-y-4'>
            <h2 className='text-sm font-medium'>Others</h2>
            {
              guardians.filter(g => !g.isPrimary).map((guardian, index) => (
                <div className={`grid grid-cols-3 gap-x-6 gap-y-4 text-[0.8125rem] ${index === guardians.length - 2 ? "mb-2" : "mb-8"}`} key={index}>
                  {[
                    { label: 'Name', value: guardian.name },
                    { label: 'Phone', value: guardian.phone },
                    { label: 'Relationship', value: `${guardian.relationship[0]}${guardian.relationship.slice(1).toLowerCase()}` },
                    { label: 'Occupation', value: guardian.occupation },
                    { label: 'Is Primary?', value: guardian.isPrimary ? "Yes" : "No" },
                    { label: 'Additional Notes', value: guardian.description ? guardian.description : "None" },
                  ].map(({ label, value }) => (
                    <div key={label} className='flex flex-col gap-y-0.5'>
                      <span className='text-gray-500 text-xs'>{label}</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              ))
            }
          </div>
        </section>
        <section className='p-6 rounded-xl bg-muted scroll-mt-40' id="documents">
          <div className='flex items-center justify-between mb-4'>
            <div className="flex flex-col gap-y-0.5">
              <h1 className="font-medium">Documents</h1>
              <p className="text-gray-500 text-[0.8125rem]">Files uploaded by the applicant as part of this submission.</p>
            </div>
            <span className='text-[0.8125rem] text-primary'>{documents.filter(d => d.status === "UPLOADED").length} Documents Awaiting Approval</span>
          </div>
          <div className='flex flex-col gap-y-4'>
            {documents.map((doc) => (
              <div className='grid grid-cols-3 gap-x-6 gap-y-4 text-[0.8125rem] border-b last:border-0 border-gray-200 pt-3 pb-5 last:mb-0' key={doc.id}>
                {[
                  { label: 'Document Type', value: doc.type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) },
                  { label: 'File Name', value: doc.fileName },
                  { label: 'File Size', value: formatBytes(doc.fileSize) },
                  { label: 'Format', value: doc.format },
                  { label: 'Status', value: `${doc.status[0]}${doc.status.slice(1).toLowerCase()}` },
                  { label: 'Rejection Reason', value: 'rejectionReason' in doc && doc.rejectionReason ? doc.rejectionReason : 'N/A' },
                ].map(({ label, value }) => (
                  <div key={label} className='flex flex-col gap-y-0.5'>
                    <span className="text-gray-500 text-xs">{label}</span>
                    <span className={`${label === "File Name" && doc.status === "REJECTED" ? "line-through" : ""}`}>{value}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
