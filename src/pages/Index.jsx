import React, { useState } from "react";
import { Box, Button, ChakraProvider, Editable, EditableInput, EditablePreview, IconButton, Table, Tbody, Td, Th, Thead, Tr, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";

const Index = () => {
  const [domains, setDomains] = useState([
    { id: 1, name: "example.com" },
    { id: 2, name: "sample.net" },
    { id: 3, name: "demo.org" },
  ]);
  const [newDomain, setNewDomain] = useState("");
  const toast = useToast();

  const handleNewDomainChange = (event) => {
    setNewDomain(event.target.value);
  };

  const addDomain = () => {
    if (newDomain.trim() === "") {
      toast({
        title: "Error",
        description: "Domain name can't be empty",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const newId = domains.length > 0 ? domains[domains.length - 1].id + 1 : 1;
    setDomains([...domains, { id: newId, name: newDomain }]);
    setNewDomain("");
    toast({
      title: "Success",
      description: "Domain added successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const deleteDomain = (id) => {
    setDomains(domains.filter((domain) => domain.id !== id));
    toast({
      title: "Deleted",
      description: "Domain removed successfully",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const updateDomain = (id, newName) => {
    const updatedDomains = domains.map((domain) => {
      if (domain.id === id) {
        return { ...domain, name: newName };
      }
      return domain;
    });
    setDomains(updatedDomains);
  };

  return (
    <ChakraProvider>
      <Box width="80%" margin="40px auto">
        <Box display="flex" justifyContent="space-between" mb="20px">
          <input value={newDomain} onChange={handleNewDomainChange} placeholder="Add new domain" style={{ flexGrow: 1, marginRight: "10px" }} />
          <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={addDomain}>
            Add Domain
          </Button>
        </Box>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Domain Name</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {domains.map((domain) => (
              <Tr key={domain.id}>
                <Td>
                  <Editable defaultValue={domain.name} onSubmit={(newName) => updateDomain(domain.id, newName)}>
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
                </Td>
                <Td>
                  <IconButton aria-label="Delete domain" icon={<FaTrash />} onClick={() => deleteDomain(domain.id)} colorScheme="red" />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </ChakraProvider>
  );
};

export default Index;
