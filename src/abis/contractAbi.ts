export const CONTRACT_ABI = [
  {
    "type": "impl",
    "name": "UsernameRegistryImpl",
    "interface_name": "paylink_registry::IUsernameRegistry"
  },
  {
    "type": "interface",
    "name": "paylink_registry::IUsernameRegistry",
    "items": [
      {
        "type": "function",
        "name": "register_name",
        "inputs": [
          { "name": "name", "type": "core::felt252" },
          { "name": "address", "type": "core::starknet::contract_address::ContractAddress" }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "resolve_name",
        "inputs": [
          { "name": "name", "type": "core::felt252" }
        ],
        "outputs": [
          { "type": "core::starknet::contract_address::ContractAddress" }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "reverse_resolve",
        "inputs": [
          { "name": "address", "type": "core::starknet::contract_address::ContractAddress" }
        ],
        "outputs": [
          { "type": "core::felt252" }
        ],
        "state_mutability": "view"
      }
    ]
  },
  {
    "type": "event",
    "name": "paylink_registry::UsernameRegistry::NameRegistered",
    "kind": "struct",
    "members": [
      { "name": "name", "type": "core::felt252", "kind": "key" },
      { "name": "owner", "type": "core::starknet::contract_address::ContractAddress", "kind": "key" }
    ]
  }
] as const;