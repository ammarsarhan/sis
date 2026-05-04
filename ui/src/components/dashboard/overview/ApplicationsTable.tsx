import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const applications = [
  {
    code: "APP-1001",
    name: "Amina Hassan",
    faculty: "Computer Science",
    country: "Egypt",
    submittedAt: "2026-04-28",
  },
  {
    code: "APP-1002",
    name: "Omar El-Sayed",
    faculty: "Engineering",
    country: "Egypt",
    submittedAt: "2026-04-27",
  },
  {
    code: "APP-1003",
    name: "Sara Mohamed",
    faculty: "Business Administration",
    country: "UAE",
    submittedAt: "2026-04-26",
  },
  {
    code: "APP-1004",
    name: "Youssef Ali",
    faculty: "Medicine",
    country: "Saudi Arabia",
    submittedAt: "2026-04-25",
  },
  {
    code: "APP-1005",
    name: "Layla Ahmed",
    faculty: "Architecture",
    country: "Jordan",
    submittedAt: "2026-04-24",
  },
  {
    code: "APP-1006",
    name: "Khaled Ibrahim",
    faculty: "Information Systems",
    country: "Egypt",
    submittedAt: "2026-04-23",
  },
  {
    code: "APP-1007",
    name: "Mariam Tarek",
    faculty: "Pharmacy",
    country: "Kuwait",
    submittedAt: "2026-04-22",
  },
  {
    code: "APP-1008",
    name: "Hassan Nasser",
    faculty: "Law",
    country: "Lebanon",
    submittedAt: "2026-04-21",
  },
  {
    code: "APP-1009",
    name: "Nour El-Din",
    faculty: "Data Science",
    country: "Egypt",
    submittedAt: "2026-04-20",
  },
  {
    code: "APP-1010",
    name: "Fatima Zahra",
    faculty: "Design",
    country: "Morocco",
    submittedAt: "2026-04-19",
  },
]

export function ApplicationsTable() {
    return (
        <div className="flex flex-col gap-y-5 mt-2 mb-6">
            <div className='flex flex-col gap-y-0.5'>
            <h1 className="font-medium">Recent Applicants</h1>
            <p className='text-[0.8125rem] text-gray-500'>A quick glance at the most recent applications submitted for review by the committee.</p>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-25">Code</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Faculty</TableHead>
                        <TableHead>Country</TableHead>
                        <TableHead>Submitted At</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applications.map((application) => (
                            <TableRow key={application.code}>
                                <TableCell className="font-medium">{application.code}</TableCell>
                                <TableCell>{application.name}</TableCell>
                                <TableCell>{application.faculty}</TableCell>
                                <TableCell>{application.country}</TableCell>
                                <TableCell>{application.submittedAt}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}
