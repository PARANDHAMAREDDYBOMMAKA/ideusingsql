// src/utils/languageBoilerplate.js

const languageBoilerplates = {
  javascript: `// JavaScript Sample Code
console.log("Hello, World!");
  
// Function example
function greet(name) {
  return \`Hello, \${name}!\`;
}
  
  console.log(greet("Developer"));
  `,
  python: `# Python Sample Code
  def greet(name):
      return f"Hello, {name}!"
  
  print("Hello, World!")
  print(greet("Developer"))
  `,
  go: `// Go Sample Code
  package main
  
  import "fmt"
  
  func greet(name string) string {
      return fmt.Sprintf("Hello, %s!", name)
  }
  
  func main() {
      fmt.Println("Hello, World!")
      fmt.Println(greet("Developer"))
  }
  `,
  c: `// C Sample Code
  #include <stdio.h>
  
  // Function to greet
  char* greet(char* name) {
      static char greeting[100];
      snprintf(greeting, sizeof(greeting), "Hello, %s!", name);
      return greeting;
  }
  
  int main() {
      printf("Hello, World!\\n");
      printf("%s\\n", greet("Developer"));
      return 0;
  }
  `,
  cpp: `// C++ Sample Code
  #include <iostream>
  #include <string>
  
  // Function to greet
  std::string greet(const std::string& name) {
      return "Hello, " + name + "!";
  }
  
  int main() {
      std::cout << "Hello, World!" << std::endl;
      std::cout << greet("Developer") << std::endl;
      return 0;
  }
  `,
  java: `// Java Sample Code
  public class Main {
      // Method to greet
      public static String greet(String name) {
          return "Hello, " + name + "!";
      }
  
      public static void main(String[] args) {
          System.out.println("Hello, World!");
          System.out.println(greet("Developer"));
      }
  }
  `,
  ruby: `# Ruby Sample Code
  def greet(name)
    "Hello, #{name}!"
  end
  
  puts "Hello, World!"
  puts greet("Developer")
  `,
  rust: `// Rust Sample Code
  fn greet(name: &str) -> String {
      format!("Hello, {}!", name)
  }
  
  fn main() {
      println!("Hello, World!");
      println!("{}", greet("Developer"));
  }
  `,
};

export const getBoilerplateCode = (language) => {
  return languageBoilerplates[language] || languageBoilerplates.javascript;
};

export default getBoilerplateCode;
