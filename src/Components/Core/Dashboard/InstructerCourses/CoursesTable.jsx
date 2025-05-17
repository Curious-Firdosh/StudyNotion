
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Table, Tbody, Thead, Tr } from "react-super-responsive-table";

export default function CoursesTable ({courses , setCourses})  {

  const dispatch = useDispatch()
  const {token} = useSelector((state) => state.auth);
  const [confirmationModal , setModal] = useState(null)



  return (
    <div>
        <Table>
            <Thead>
                <Tr>
                    <Th>Courses</Th>
                    <Th>Duration</Th>
                    <Th>Price</Th>
                    <Th>Actions</Th>
                </Tr>
            </Thead>

            <Tbody>
                {
                  courses.length ===  0  ?  (
                    <Tr>
                        <Td >No Courses Found</Td>
                    </Tr>
                  )
                  :
                  (
                    courses?.map((course) => (
                      <Tr key={course._id}>
                            <Td>
                                <img
                                    src={course?.thumbNail}
                                    className="h-[150px] w-[220px] rounded-lg object-cover "
                                />
                            </Td>
                      </Tr>
                    ))
                  )
                     
                  
                }
            </Tbody>
        </Table>
    </div>
  )
}


