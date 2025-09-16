{ pkgs, ... }: {
  channel = "stable-24.05";
  packages = [
    pkgs.caddy
  ];
  idx = {
    extensions = [
      "google.gemini-cli-vscode-ide-companion"
    ];
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["caddy" "file-server" "--root" "public" "--listen" ":$PORT" "--browse"];
          manager = "web";
        };
      };
    };
    workspace = {
      onCreate = {
        default.openFiles = [ "public/index.html" "public/style.css" ".idx/dev.nix" ];
      };
      onStart = {
        start-server = "caddy file-server --root public --listen :$PORT";
      };
    };
  };
}
