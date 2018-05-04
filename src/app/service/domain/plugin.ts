export interface PluginsWithTotal {
  total_count: number;
  items: Plugin[];
}

export interface Plugin {
  name: string;
  version: string;
  cover: string;
  desc: string;
  enter_point: string;
  enable: boolean;
  install_dir: string;
  webs_dir: string;
  install_time: string;
  update_time: string;
}
