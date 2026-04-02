#[starknet::interface]
trait IUsernameRegistry<TContractState> {
    fn register_username(ref self: TContractState, username: felt252);
    fn get_address(self: @TContractState, username: felt252) -> starknet::ContractAddress;
    fn get_username(self: @TContractState, address: starknet::ContractAddress) -> felt252;
}

#[starknet::contract]
mod UsernameRegistry {
    use starknet::get_caller_address;
    use starknet::ContractAddress;

    #[storage]
    struct Storage {
        usernames: LegacyMap::<felt252, ContractAddress>,
        addresses: LegacyMap::<ContractAddress, felt252>,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        UsernameRegistered: UsernameRegistered,
    }

    #[derive(Drop, starknet::Event)]
    struct UsernameRegistered {
        username: felt252,
        address: ContractAddress,
    }

    #[external(v0)]
    impl UsernameRegistryImpl of super::IUsernameRegistry<ContractState> {
        fn register_username(ref self: ContractState, username: felt252) {
            let caller = get_caller_address();
            
            // Ensure username is not already taken
            let existing_address = self.usernames.read(username);
            assert(existing_address.is_zero(), 'Username already taken');

            // Ensure caller doesn't already have a username
            let existing_username = self.addresses.read(caller);
            assert(existing_username == 0, 'Address already has username');

            // Register the mapping
            self.usernames.write(username, caller);
            self.addresses.write(caller, username);

            // Emit event
            self.emit(UsernameRegistered { username, address: caller });
        }

        fn get_address(self: @ContractState, username: felt252) -> ContractAddress {
            self.usernames.read(username)
        }

        fn get_username(self: @ContractState, address: ContractAddress) -> felt252 {
            self.addresses.read(address)
        }
    }
}
