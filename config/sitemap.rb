# Set the host name for URL creation
SitemapGenerator::Sitemap.default_host = "https://www.getpampered.io"

SitemapGenerator::Sitemap.create do
  # Put links creation logic here.
  #
  # The root path '/' and sitemap index file are added automatically for you.
  # Links are added to the Sitemap in the order they are specified.
  #
  # Usage: add(path, options={})
  #        (default options are used if you don't specify)
  #
  # Defaults: :priority => 0.5, :changefreq => 'weekly',
  #           :lastmod => Time.now, :host => default_host
  #
  # Examples:
  #
  # Add '/articles'
  #

  %w(google bing apple).each do |subdomain|
    SitemapGenerator::Sitemap.default_host = "https://#{subdomain}.hrsimple.com"
    SitemapGenerator::Sitemap.sitemaps_path = "sitemaps/#{subdomain}"
    SitemapGenerator::Sitemap.create do
      add '/'
      add welcome_index_path, :priority => 0.9, :changefreq => 'yearly'
      add welcome_about_path, :priority => 0.7, :changefreq => 'yearly'
      add welcome_services_path, :priority => 0.8, :changefreq => 'yearly'
      add welcome_contact_path, :priority => 0.6, :changefreq => 'yearly'
    end
  end
end
