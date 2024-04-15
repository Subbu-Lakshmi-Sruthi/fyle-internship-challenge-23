# Fyle frontend Task
This repository is a fork containing the codebase for a qualification task designed for candidates seeking the Frontend Development intern'24 position at Fyle. It is an application that takes a GitHub username as input and displays the public Github repositories belonging to the user.
# Unit tests
As part of the challenge, unit tests have been created for the header component and the api.service. Both can be executed using the command:
```  
ng test --include <file_path> 
// replace <file_path> with src/app/services and src/app/header
```
The test coverage of both can be assessed with the following command:
```  
ng test --code-coverage --include <file_path>
```
> Note: Please ensure that you are connected to the internet, as certain CDNs and online assets such as lottie files are used for rendering of the page. Failure to do so may result in pages rendering without styles and not functioning as expected.
# Assumptions
Per page option is assumed to take one of the following values only for ease of use
```  
10, 20, 50, 100
```