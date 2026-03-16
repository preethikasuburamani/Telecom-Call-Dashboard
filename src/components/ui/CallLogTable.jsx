import { Table, TableBody,TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow,} from "./table"


export function CallLogTable({data}) {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
            <TableHead>Caller Name</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((call) => (
          <TableRow key={call.id || call.callerName}>
             <TableCell className="font-medium">{call.callerName}</TableCell>
                <TableCell>{call.city}</TableCell>
                <TableCell>{call.callDuration}s</TableCell>
                <TableCell>${call.callCost}</TableCell>
                <TableCell>{call.callStatus ? "✅" : "❌"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

