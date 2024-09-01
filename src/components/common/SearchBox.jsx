import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { SearchIcon } from "lucide-react"

const SearchBox = ({ value, setValue, className }) => {
    return (
        <InputGroup className={className}>
            <InputLeftElement>
                <SearchIcon />
            </InputLeftElement>
            <Input
                size="xl"
                type="text"
                placeholder="Type to search"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </InputGroup>
    )
}

export default SearchBox