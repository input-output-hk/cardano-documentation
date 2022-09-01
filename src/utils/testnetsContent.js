// This is the content moved over from testnets site that was stored in Markdown. Is used for Faucet,
// downloaders and staking calculator

export default {
  staking_calculator: {
    saturation: 'Pool saturation',
    select_a_calculator: 'Select a calculator',
    i_want_to: 'I want to',
    delegate_my_stake: 'Delegate my stake',
    run_a_stake_pool: 'Run a stake pool',
    show_advanced_options: 'Advanced options',
    treasury_rate_label: 'Treasury rate',
    treasury_rate_descriptor: '% of gross rewards distributed to the treasury',
    expansion_rate_label: 'Expansion rate',
    expansion_rate_descriptor: '% of reserves released per epoch',
    reset: 'Reset',
    share: 'Share',
    tweet: 'Tweet',
    copy_to_clipboard: 'Copy to clipboard',
    ada_label: 'Ada amount',
    ada_descriptor: 'Set the amount of ada you want to delegate',
    ada_label_operator: 'Pledge amount',
    ada_descriptor_operator:
      'Set the amount of ada you want to pledge to your pool',
    currency_label: 'Currency',
    currency_descriptor:
      'Please select the currency you wish to see results in',
    exchange_rate_label: 'Exchange rate',
    exchange_rate_descriptor:
      'Set the value of a single ada in {{ currency }}, defaults to [CoinGecko market rate](https://www.coingecko.com/en/coins/cardano)\n',
    fixed_fee_label: 'Stake pool daily fixed fee',
    fixed_fee_descriptor_ada:
      'Set the fixed fee covering daily stake pool running costs\n',
    fixed_fee_descriptor:
      'Set the fixed fee covering daily stake pool running costs, in ADA ({{amount}} ADA)\n',
    stake_pool_control_label: 'Stake pool total stake',
    stake_pool_control_descriptor:
      'Set the amount of stake the pool controls, as a percentage of the total available stake',
    total_stake_pools_label: 'Total stake pools',
    participation_rate_label: 'Delegation participation rate',
    participation_rate_descriptor:
      'Set the total amount of stake delegated across the network in this epoch, as a percentage of the total available stake',
    operators_stake_label: "Stake pool operator's stake",
    operators_stake_descriptor:
      "Set the size of the stake pool operator's stake",
    stake_pool_margin_label: 'Stake pool operator reward percentage',
    stake_pool_margin_descriptor:
      'Set the amount of rewards taken by the stake pool operator, as a percentage of the total rewards earned by the pool',
    stake_pool_performance_label: 'Stake pool performance',
    stake_pool_performance_descriptor:
      'How efficient is the stake pool, influences the stake pools penalty on the gross rewards. Any penalties go to the treasury',
    delegation_rewards: 'Delegation rewards',
    yield: 'Yield',
    yearly: 'Yearly',
    private_stake_pool_label: 'Private stake pool',
    private_stake_pool_descriptor:
      'Is the stake pool open to third party staking',
    running_costs: 'Running costs',
    stake_pool_operation_rewards: 'Stake pool operation rewards',
    combined_rewards: 'Combined rewards',
    transaction_fees_per_epoch_label: 'Average transaction fees per epoch',
    transaction_fees_per_epoch_descriptor:
      'The average amount of transaction fees per epoch are added to the net distribution of rewards and used to calculate the distribution rate from the reserves',
    influence_factor_label: 'Influence factor (a0)',
    influence_factor_descriptor:
      'System parameter used to control the ADA distribution rate',
  },
  kevm_description:
    'The KEVM is a high quality, formally verified smart contract virtual machine compatible with the Ethereum virtual machine (EVM). Formally specified in the K framework, the KEVM uses formal semantics for elements such as the configuration and transition rules of EVM, resulting in a more secure virtual machine for smart contracts.\n',
  iele_description:
    'The IELE testnet underpins the path to a more secure, robust smart contract design for Cardano. It is a new register-based virtual machine for smart contracts built to take account of the lessons learned from LLVM. IELE aims to provide the most secure and high-performance platform for running smart contracts, while also delivering the most flexible set of interfaces possible to execute different programming languages.\n',
  faucet_content: {
    funds: 'funds',
    invalid_address: 'Invalid address',
    server_error: 'Server error',
    endpoint_not_found: 'Server endpoint not found',
    too_many_attempts: 'Too many requests',
    too_many_attempts_retry: 'Too many requests, retry after {{ time }}',
    address_helper_text: 'The address to send funds to',
    api_key_helper_text: 'Optional API key to bypass rate limiting',
    request_funds: 'Request funds',
    request_more_funds: 'Request more funds',
    success_heading: 'Success',
    verify_transaction_hash: 'Please verify the following transaction hash:',
    // transaction_successful: 'Your transaction has been successful and __{{ amount }}__ have been sent to __{{ address }}__.',
    transaction_successful:
      'Your transaction has been successful and test funds have been sent to __{{ address }}__.',
    please_complete_recaptcha: 'Please complete the ReCAPTCHA',
  },
  downloaders_content: {
    version: 'Version',
    error_fetching_data: 'Error fetching data',
    no_releases_available:
      'No releases are currently available right now, please check back later.',
    platforms_order: [
      {
        platform_name: 'darwin',
      },
      {
        platform_name: 'linux',
      },
      {
        platform_name: 'windows',
      }
    ],
    environment: {
      testnet: 'Testnet',
      preprod: 'Pre-production',
      preview: 'Preview'
    },
    sha_checksum: 'SHA256 checksum',
    verify_signature: 'Verify signature',
    pgp_signature: 'PGP signature',
    verify_checksum: 'Verify checksum',
    copy_to_clipboard: 'Copy to clipboard',
    windows: {
      short_label: 'Windows',
      full_label: 'Windows 8.1 and 10, 64 bit',
      checksum_instructions:
        '## Windows checksum verification instructions\n\n### Installer integrity\n\nSHA256 checksum can be verified using the following command:\n\n```shell\ncertutil -hashfile C:\\Users\\YOUR_USERNAME\\Downloads\\{{ filename }} SHA256\n```\n\nInstead of typing the path to the Daedalus installer executable use drag and drop:\n\n1. Press Windows Start Menu\n1. Type cmd\n1. You should see cmd.exe in the list of results. Click on cmd.exe to launch it.\n1. Type or paste: certutil -hashfile\n1. Press space\n1. Drag and drop Daedalus installer from Explorer to Command Prompt\n1. Press space\n1. Type or paste: SHA256\n1. Press enter key\n\nYou should see the following output, where string on the second line is the SHA256 checksum:\n\n```shell\nSHA256 hash of file C:\\Users\\YOUR_USERNAME\\Downloads\\{{ filename }}:\n\n{{ sha256 }}\n\nCertUtil: -hashfile command completed successfully.\n```\n',
      signature_instructions:
        "## Windows PGP signature verification instructions\n\n1. Obtain both the Daedalus installer .exe file, and its corresponding .exe.asc signature file -- put them in the same directory.\n1. Obtain the GNUPG package from [https://www.gpg4win.org/](https://www.gpg4win.org/)\n1. Proceed with installation and launch the Kleopatra component.\n1. Unless you already have a personal GPG key, you will have to create one (which is required for step 6):\n  - Select the menu item File -> New keypair -> Create a personal OpenPGP key pair.\n  - Enter a name and an email address that suit you personally.\n  - Choose a passphrase to protect your personal key (NOTE: the passphrase can be empty, but it is not recommended if you intend to use GNUPG in future).\n1. Import the IOHK key:\n  - File -> Lookup on Server\n  - Allow network access to 'dirmngr', if the prompt arises\n  - Search for signing.authority@iohk.io\n  - Import the key\n  - Do not certify the key just yet\n  - Right-click on the key, and choose \"Details\"\n  - Ensure that the fingerprint is D32587D4090FE461CAEE0FF4966E5CB9CBFAA9BA\n  - If it's not, the wrong key was imported, right click and delete\n  - If it is, we are good to go\n1. Certify the IOHK key (this designates trust and is required for the next step):\n  - Once you have a personal GPG key, right-click on the imported IOHK key and choose Certify\n  - Enable the IOHK user ID\n  - Tick the I have verified the fingerprint checkbox (since you did, as per step 5), and proceed.\n  - You should receive a message saying Certification successful\n1. Verify the installer binary:\n  - Click the Decrypt/Verify button on the Kleopatra toolbar\n  - Choose the Daedalus installer .exe file in the file dialog (the .asc signature file must reside in the same directory)\n1. If the verification is successful, you will receive a green-tinted message box saying:\n  - Valid signature by signing.authority@iohk.io\n  - Date of signature\n  - With certificate D325 87D4 090F E461 CAEE 0FF4 966E 5CB9 CBFA A9BA\n  - Anything else would constitute a signature verification failure.\n",
    },
    darwin: {
      short_label: 'Mac OS',
      full_label: 'Mac OS 64 bit',
      checksum_instructions:
        '## MacOS checksum verification instructions\n\n### Installer integrity\n\nSHA256 checksum can be verified using the following command:\n\n```shell\nshasum -a 256 ~/Downloads/{{ filename }}\n```\n\nInstead of typing the path to the Daedalus installer executable use drag and drop:\n\n1. Open Terminal\n1. Type or paste: `shasum -a 256`\n1. Press space key\n1. Drag and drop Daedalus installer from Finder to Terminal\n1. Press enter key\n\nYou should see the following output, where string before the file path is the SHA256 checksum:\n\n```shell\n{{ sha256 }} ~/Downloads/{{ filename }}\n```\n',
      signature_instructions:
        "## MacOS PGP signature verification instructions\n\n1. Obtain both the Daedalus installer .pkg file, and its corresponding .pkg.asc signature file -- put them in the same directory.\n1. If you already have the GPG Suite installed, and a personal key generated, please skip to step 5, and if not, proceed with the next step.\n1. Go to [https://gpgtools.org](https://gpgtools.org), head to the GPG Suite section, download the .dmg file and install it:\n  * Right-click the .dmg file, then Open, which will open a new window with two icons: Install and Uninstall\n  * Right-click the Install icon, and choose Open with.. -> Installer, which should start the GPG Suite installer\n  * Follow through the installation wizard\n1. Once GPG Suite installation completes, it will ask you to create a new key pair (this is required for step 6, so please don’t skip it):\n  * Enter a name and an email that suit you personally.\n  * Choose a passphrase to protect your personal key (NOTE: the passphrase can be empty, but it is not recommended if you intend to use this key and GPG Suite in future).\n1. Import the IOHK key using the GPG Keychain application:\n  * Select Key -> Lookup Key on Key Server in the application menu\n  * Search for signing.authority@iohk.io\n  * Choose the key with fingerprint CBFAA9BA with the user ID “IOHK Signing Authority ”, then click Retrieve Key\n  * Verify (right-click the imported key, then Details) that the fingerprint of the imported key is D325 87D4 090F E461 CAEE 0FF4 966E 5CB9 CBFA A9BA\n  * If it's not, the wrong key was imported, right click and delete\n  * If it is, we are good to proceed with the next step.\n1. Sign the imported IOHK key (this designates trust and is required for the next step):\n  * Right-click on the imported IOHK key, then “Sign”.\n1. Verify the installer binary:\n  * Right-click the Daedalus installer (.pkg file) in Finder (do NOT right click on the .asc file, that will not work), then select Services -> OpenPGP: Verify Signature of File (the .asc signature file must reside in the same directory)\n  * The Verification Results dialog will then appear with the verdict in the Result column:\n    1. “Signed by: IOHK Signing Authority 1471941A -- full trust” -- if successful\n    1. ..anything else means there was no valid signature for the installer.\n",
    },
    linux: {
      short_label: 'Linux',
      full_label: 'Linux 64 bit',
      checksum_instructions:
        '## Linux checksum verification instructions\n\n### Installer integrity\n\nVerify the sha256 hash:\n\n```shell\nsha256sum ~/Downloads/{{ filename }}\n```\n\nExpected:\n\n```shell\n{{ sha256 }}\n```\n',
      signature_instructions:
        '## Linux PGP signature verification instructions\n\n- Obtain both the Daedalus installer .bin file, and its corresponding .bin.asc signature file -- put them in the same directory.\n- Ensure that the gpg2 command is available (assuming Ubuntu Linux) in your shell, and if not -- execute the following shell command (shell commands further indicated by this bold monospace font):\n  - `apt-get install gnupg2`\n- Unless you already have a personal GPG key, create one (this is required for step 5):\n  - `gpg2 --generate-key`\n  - Supply an user ID (real name and email) that suit you personally\n  - Choose a passphrase to protect your personal key (NOTE: the passphrase can be empty, but it is not recommended if you intend to use this key and GNUPG in future)\n- Import the IOHK key:\n  - `gpg2 --keyserver hkp://keys.openpgp.org --search-keys signing.authority@iohk.io`\n  - In the selection dialogue, choose the key with fingerprint 966E5CB9CBFAA9BA\n- Sign the IOHK key (this designates trust and is required for the next step):\n  - `gpg2 --lsign D32587D4090FE461CAEE0FF4966E5CB9CBFAA9BA`\n- Verify the installer binary using the .asc signature (the .asc signature file must reside in the same directory as the installer binary):\n  - `gpg2 --verify {{ filename }}.asc`\n  - Successful verification should produce a message like follows:\n\n```shell\ngpg: assuming signed data in {{ filename }}.pkggpg: Signature made ...DATE...gpg: using RSA key 9F9840B50AE539A2732CF646C131557F1471941Agpg: checking the trustdbgpg: marginals needed: 3 completes needed: 1 trust model: pgpgpg: depth: 0 valid: 1 signed: 1 trust: 0-, 0q, 0n, 0m, 0f, 1ugpg: depth: 1 valid: 1 signed: 0 trust: 1-, 0q, 0n, 0m, 0f, 0ugpg: next trustdb check due at ...DATE...gpg: Good signature from IOHK Signing Authority <signing.authority@iohk.io>\n```\n',
    }
  },
}
