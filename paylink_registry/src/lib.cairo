#[starknet::interface]
pub trait IUsernameRegistry<TContractState> {
    fn register_name(ref self: TContractState, name: felt252, address: starknet::ContractAddress);
    fn resolve_name(self: @TContractState, name: felt252) -> starknet::ContractAddress;
    fn reverse_resolve(self: @TContractState, address: starknet::ContractAddress) -> felt252;
}

#[starknet::contract]
mod UsernameRegistry {
    // Note: We use 'starknet::' instead of 'core::starknet::' to fix those warnings
    use starknet::ContractAddress;
    use starknet::storage::{Map, StorageMapReadAccess, StorageMapWriteAccess};
    use core::num::traits::Zero; 

    #[storage]
    struct Storage {
        registry: Map<felt252, ContractAddress>,
        reverse_registry: Map<ContractAddress, felt252>,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        NameRegistered: NameRegistered,
    }

    #[derive(Drop, starknet::Event)]
    struct NameRegistered {
        #[key]
        name: felt252,
        #[key]
        owner: ContractAddress,
    }

    #[abi(embed_v0)]
    impl UsernameRegistryImpl of super::IUsernameRegistry<ContractState> {
        fn register_name(ref self: ContractState, name: felt252, address: ContractAddress) {
            let existing = self.registry.read(name);
            
            // This is the fix for error [E0002]
            assert(existing.is_zero(), 'Name already registered');

            self.registry.write(name, address);
            self.reverse_registry.write(address, name);

            self.emit(NameRegistered { name, owner: address });
        }

        fn resolve_name(self: @ContractState, name: felt252) -> ContractAddress {
            self.registry.read(name)
        }

        fn reverse_resolve(self: @ContractState, address: ContractAddress) -> felt252 {
            self.reverse_registry.read(address)
        }
    }
}