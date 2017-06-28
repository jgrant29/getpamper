# -*- encoding: utf-8 -*-
# stub: plaid 4.0.0 ruby lib

Gem::Specification.new do |s|
  s.name = "plaid".freeze
  s.version = "4.0.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.metadata = { "allowed_push_host" => "https://rubygems.org" } if s.respond_to? :metadata=
  s.require_paths = ["lib".freeze]
  s.authors = ["Edmund Loo".freeze]
  s.bindir = "exe".freeze
  s.date = "2017-03-09"
  s.description = "Ruby gem wrapper for the Plaid API. Read more at the homepage, the wiki, or in the Plaid documentation.".freeze
  s.email = ["eloo@plaid.com".freeze]
  s.homepage = "https://plaid.com/".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.0.0".freeze)
  s.rubygems_version = "2.6.12".freeze
  s.summary = "Ruby bindings for Plaid".freeze

  s.installed_by_version = "2.6.12" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_development_dependency(%q<bundler>.freeze, ["~> 1.7"])
      s.add_development_dependency(%q<rake>.freeze, ["~> 10.0"])
      s.add_development_dependency(%q<sdoc>.freeze, ["~> 0.4.1"])
      s.add_development_dependency(%q<minitest>.freeze, ["~> 5.8"])
    else
      s.add_dependency(%q<bundler>.freeze, ["~> 1.7"])
      s.add_dependency(%q<rake>.freeze, ["~> 10.0"])
      s.add_dependency(%q<sdoc>.freeze, ["~> 0.4.1"])
      s.add_dependency(%q<minitest>.freeze, ["~> 5.8"])
    end
  else
    s.add_dependency(%q<bundler>.freeze, ["~> 1.7"])
    s.add_dependency(%q<rake>.freeze, ["~> 10.0"])
    s.add_dependency(%q<sdoc>.freeze, ["~> 0.4.1"])
    s.add_dependency(%q<minitest>.freeze, ["~> 5.8"])
  end
end
