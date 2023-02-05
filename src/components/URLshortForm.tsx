import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Box,
  Container,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import axios from "axios";

interface Props {}

const URLshortForm: React.FC<Props> = () => {
  interface IData {
    shortUrl: string;
    longUrl: string;
    urlCode: string;
    id: number;
    children: JSX.Element | JSX.Element[];
  }
  interface State {
    items: IData[];
  }

  const [longUrl, setLongUrl] = useState([]);
  const [shortUrI, setShortUrI] = useState<State>({ items: [] });

  useEffect(() => {
    axios
      .get("http://localhost:3005/all")
      .then((res) => {
        setShortUrI({ items: res.data.ServerResponse });
      })
      .catch((err) => console.log(err));
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await axios
      .post("http://localhost:3005/shorten", { longUrl })
      .then((res) => {
        console.log(res);
        // setShortUrI(res.data.data);
      })
      .catch((err) => console.log(err));
  }

  console.log(shortUrI.items);

  return (
    <div>
      <Box pos="relative">
        <Container maxW="container.xl">
          <FormControl>
            <FormLabel>Long Url</FormLabel>
            <Input
              onChange={(e: any) => {
                setLongUrl(e.target.value);
              }}
              placeholder="http://example.com"
            />
            <FormHelperText>We'll never share your email.</FormHelperText>
            <form onSubmit={handleSubmit}>
              <Button type="submit" colorScheme="blue">
                Button
              </Button>
            </form>
          </FormControl>

          {shortUrI.items &&
            shortUrI.items.reverse().map((ele, key) => (
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    http:localhost:3005
                    <Tr>
                      <Th>{key}</Th>
                      <Th>LongUrl</Th>
                      <Th margin="auto">ShortUrl</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td></Td>
                      <Td whiteSpace="normal" maxWidth="12rem">
                        {ele.longUrl}
                      </Td>
                      <Td backgroundColor="#3dd3d3" width="30%">
                        <a
                          href={`http://localhost:3005/` + ele.urlCode}
                          target="_blank"
                        >
                          {ele.shortUrl}
                        </a>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            ))}
        </Container>
      </Box>
    </div>
  );
};

export default URLshortForm;
